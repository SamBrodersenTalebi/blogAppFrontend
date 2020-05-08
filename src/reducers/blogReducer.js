import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      //could use concat return new array!
      return [...state, action.data];
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
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'CREATE',
      data: newBlog,
    });
  };
};

export default reducer;
