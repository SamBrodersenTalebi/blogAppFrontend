import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Notification = () => {
  const content = useSelector((state) => state.notification.content);
  const status = useSelector((state) => state.notification.status);
  if (content === null) {
    return <div style={{ display: 'none' }}></div>;
  } else {
    return <Alert severity={status}>{content}</Alert>;
  }
};

export default Notification;
