import React, { useEffect } from 'react';
import { initialUsers } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>
    </div>
  );
}
