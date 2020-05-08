import React from 'react';

const Notification = ({ message, error }) => {
  const notification = error ? 'error' : 'notification';
  if (message === null) {
    return null;
  }

  return <div className={notification}>{message}</div>;
};

export default Notification;
