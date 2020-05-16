import React, { useEffect } from 'react';
import { intialUsers } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(intialUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
    </div>
  );
}
