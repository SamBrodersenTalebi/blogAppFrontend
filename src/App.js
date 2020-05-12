import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import './App.css';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { initialBlogs } from './reducers/blogReducer';
import { logout, initAuth } from './reducers/authReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = React.createRef();
  let blogs = useSelector((state) => state.blogs);
  let user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(initialBlogs());
    //get blogs
  }, []);

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  if (user === null) {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel='Login'>
          <LoginForm />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
};

export default App;
