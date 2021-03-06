import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import thunk from 'redux-thunk';
import { initAuth } from './reducers/authReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  auth: authReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

console.log(store.getState());
store.subscribe(() => {
  //store.dispatch(initAuth());
  console.log(store.getState());
});

export default store;
