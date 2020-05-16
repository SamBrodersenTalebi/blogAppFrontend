import React, { Fragment } from 'react';
import { logout } from '../../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

export default function NavDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <p>
        <em>{user.name} logged in</em>
      </p>
      <Button onClick={logoutUser}> log out</Button>
    </Fragment>
  );
}
