import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from '../reducers/userReducer';

const Users = () => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>Users</h2>
    </div>
  );
};

export default Users;
