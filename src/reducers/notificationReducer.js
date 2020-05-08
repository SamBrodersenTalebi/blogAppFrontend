const initialNotication = '';

const notificationReducer = (state = initialNotication, action) => {
  switch (action.type) {
    case 'ADD':
      return action.data;
    case 'REMOVE':
      return '';
    default:
      return state;
  }
};

//Actions
const removeNotification = () => {
  return {
    type: 'REMOVE',
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
