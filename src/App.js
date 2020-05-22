import React, { useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
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
          <Container style={{ marginBottom: 90 }}>
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
          </Container>
          <Footer />
        </>
      ) : (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading please wait
          <CircularProgress color='secondary' />
        </div>
      )}
    </Container>
  );
};

export default App;
