import blogService from '../services/blogs';

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
      const content = 'You have created: ' + blog.title;
      dispatch({
        type: 'ADD',
        data: content,
      });
    } catch (error) {
      dispatch({
        type: 'ADD',
        data: 'Something went wrong',
      });
      console.log(error.response.data.error);
    }
  };
};

//delete blog
export const deleteBlogRedux = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch({
        type: 'DELETE',
        data: id,
      });
      dispatch({
        type: 'ADD',
        data: 'Deleted blog',
      });
    } catch (error) {
      dispatch({
        type: 'ADD',
        data: 'Not authorized',
      });
      console.log(error.response.data.error);
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
      dispatch({
        type: 'ADD',
        data: 'You just liked: ' + blog.title,
      });
    } catch (error) {
      dispatch({
        type: 'ADD',
        data: error.response.data.error,
      });
      console.log(error.response.data.error);
    }
  };
};

export default reducer;
