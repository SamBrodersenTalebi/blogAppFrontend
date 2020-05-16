import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {} from '../../reducers/userReducer';

const User = ({ user }) => {
  console.log(user);
  return <div>Hi</div>;
};

export default User;
/*     {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))} 
        */
