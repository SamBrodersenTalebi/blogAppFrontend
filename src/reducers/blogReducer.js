import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [...state, action.data];
    case 'DELETE':
      const index = state.findIndex((blog) => (blog.id = action.data));
      let newBlogs = state.splice(index, 1);
      return newBlogs;
    default:
      return state;
  }
};

/*
ACTIONS
*/

//Get inital blogs
export const initialBlogs = (blogs) => {
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
      const content = 'you have created: ' + blog.title;
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
      const deletedBlog = await blogService.getById(id);
      await blogService.remove(id);
      console.log(deletedBlog);
      dispatch({
        type: 'DELETE',
        data: deletedBlog,
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

export default reducer;
