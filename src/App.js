import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import './App.css';
import LoginForm from './components/auth/LoginForm';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Landing from './components/layout/Landing';
import User from './components/users/User';
import BlogDetail from './components/blogs/BlogDetail';
import { useDispatch, useSelector } from 'react-redux';
import { initAuth } from './reducers/authReducer';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Footer from './components/layout/Footer';

const App = () => {
  const dispatch = useDispatch();
  //const blogFormRef = React.createRef();
  const loading = useSelector((state) => state.auth.loading);
  const users = useSelector((state) => state.users);
  const matchUser = useRouteMatch('/users/:id');
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const blogs = useSelector((state) => state.blogs);
  const matchBlog = useRouteMatch('/blogs/:id');
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  return (
    <Container>
      {loading ? (
        <>
          <Container>
            <Navbar />
            <Notification />
            <Switch>
              <Route path='/login' exact component={LoginForm} />
              <Route path='/register' exact component={Register} />
              <Route path='/' exact component={Landing} />
              <Route path='/users' exact component={Users} />
              <Route path='/users/:id'>
                <User user={user} />
              </Route>
              <Route path='/blogs/:id'>
                <BlogDetail blog={blog} />
              </Route>
            </Switch>
            <Footer />
          </Container>
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </Container>
  );
};

export default App;
/*
      <h2>Users</h2>
      <table>
        <tr>
          <th>Username</th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <User user={user} />
        ))}
      </table>
*/

/*if (user === null) {
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
  */
