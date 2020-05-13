import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data;
    default:
      return state;
  }
};

const initialUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USER',
      data: users,
    });
  };
};

export default reducer;
