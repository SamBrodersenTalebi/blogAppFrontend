import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools());
console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
