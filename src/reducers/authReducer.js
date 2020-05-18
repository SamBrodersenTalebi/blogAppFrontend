import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const initialState = {
  token: '',
  user: null,
  loading: false,
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
        loading: true,
      };
    case 'INIT_AUTH':
      return {
        ...state,
        token: action.data.token,
        loading: true,
        user: { name: action.data.name, username: action.data.username },
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
      dispatch(setNotification('successful login', 2));
    } catch (error) {
      dispatch(setNotification('wrong username or password', 2));
      console.log(error);
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
    console.log(JSON.parse(loggedUserJSON));
    if (loggedUserJSON) {
      const userObject = JSON.parse(loggedUserJSON);
      blogService.setToken(userObject.token);
      dispatch({
        type: 'INIT_AUTH',
        data: userObject,
      });
    } else {
      blogService.setToken('');
    }
  };
};

export default authReducer;
