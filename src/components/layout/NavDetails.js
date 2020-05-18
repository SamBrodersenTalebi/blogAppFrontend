import React, { Fragment } from 'react';
import { logout } from '../../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

export default function NavDetails() {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <a className='' onClick={logoutUser}>
        {' '}
        log out
      </a>
    </Fragment>
  );
}
