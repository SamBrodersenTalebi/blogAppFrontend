const initialNotication = null;

const notificationReducer = (state = initialNotication, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'ADD':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

//Actions
const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION',
  };
};

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch({
      type: 'ADD',
      data: content,
    });
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationReducer;
