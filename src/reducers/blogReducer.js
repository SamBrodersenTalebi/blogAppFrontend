import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [...state, action.data];
    case 'DELETE':
      const newBlogs = state.filter((blog) => blog.id !== action.data);
      console.log(newBlogs);
      return newBlogs;
    case 'LIKE':
      const newBlog = state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
      return newBlog;
    case 'COMMENT':
      const blogs = state.map((blog) => {
        //if blog id does not match it will return blog otherwise the newly updated blog
        return blog.id !== action.data.id ? blog : action.data;
      });
      return blogs;
    default:
      return state;
  }
};

/*
ACTIONS
*/

//Get inital blogs
export const initialBlogs = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

//create a new blog
export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: 'CREATE',
        data: newBlog,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};

//delete blog
export const deleteBlogRedux = (id, deletedBlog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({
        type: 'DELETE',
        data: id,
      });
      dispatch(setNotification(`You deleted: ${deletedBlog}`, 2));
    } catch (error) {
      dispatch(setNotification(`Not authorized`, 2));
      console.log(error.response);
    }
  };
};

//Like blog
export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getById(id);
      const changedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      };
      const updatedBlog = await blogService.update(changedBlog, id);
      dispatch({
        type: 'LIKE',
        data: updatedBlog,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//comment blog
export const commentBlog = (content, id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.addComment(content, id);
      dispatch({
        type: 'COMMENT',
        data: blog,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default reducer;
