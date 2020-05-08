import userService from '../services/login';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data;
    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const user = await userService.login(credentials);
    //save user to local storage:
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    dispatch({
      type: 'INIT_USER',
      data: user,
    });
  };
};

export default reducer;
