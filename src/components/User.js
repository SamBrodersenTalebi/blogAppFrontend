import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from '../reducers/userReducer';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <Fragment>
      <tr>
        <th>{user.name}</th>
        <th>{user.blogs.length}</th>
      </tr>
    </Fragment>
  );
};

export default User;
/*     {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))} 
        */
