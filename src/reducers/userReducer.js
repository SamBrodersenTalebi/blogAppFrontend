import userService from '../services/login';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
