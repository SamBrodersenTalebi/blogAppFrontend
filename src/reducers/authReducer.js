import loginService from '../services/login';
import blogService from '../services/blogs';

const initialState = {
  token: '',
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.data.token,
        user: { name: action.data.name },
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'INIT_AUTH':
      return {
        ...state,
        token: action.data.token,
        user: { name: action.data.name },
      };
    default:
      return state;
  }
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      //save user to local storage:
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        data: user,
      });
      dispatch({
        type: 'ADD',
        data: 'Successful login',
      });
    } catch (error) {
      //if it does not login!
      dispatch({
        type: 'ADD',
        data: 'Failed to login to user',
      });
      console.log(err.response.data.error);
      console.log(err.response.data);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedNoteappUser');
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const initAuth = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const localUser = JSON.parse(loggedUserJSON);
      blogService.setToken(localUser.token);
    } else {
      blogService.setToken('');
    }
    dispatch({
      type: 'INIT_AUTH',
      data: localUser,
    });
  };
};

export default authReducer;
