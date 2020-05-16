import React, { useEffect } from 'react';
import { initialUsers } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';
import UserList from './UserList';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <UserList />
    </div>
  );
}
