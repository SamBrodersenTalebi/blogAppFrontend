import React from 'react';
//import { useParams } from 'react-router-dom';

const User = ({ user }) => {
  /*
  const id = useParams().id
  const user = users.find(user => user.id === id) 
  */
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
