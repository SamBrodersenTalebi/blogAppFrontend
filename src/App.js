import React, { useState, useEffect } from 'react';
//import Blog from './components/Blog';
import Notification from './components/Notification';
import './App.css';
/*
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
*/
import LoginForm from './components/auth/LoginForm';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { useDispatch, useSelector } from 'react-redux';
import { initAuth } from './reducers/authReducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Footer from './components/layout/Footer';

const App = () => {
  const dispatch = useDispatch();
  //const blogFormRef = React.createRef();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(initAuth());
  }, []);

  return (
    <Container>
      {loading ? (
        <>
          <Router>
            <Container>
              <Navbar />
              <Notification />
              <Switch>
                <Route path='/login' exact component={LoginForm} />
                <Route path='/register' exact component={Register} />
                <Route path='/' exact component={Landing} />
              </Switch>
              <Footer />
            </Container>
          </Router>
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
