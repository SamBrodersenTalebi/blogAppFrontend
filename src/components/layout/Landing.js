import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import BlogList from '../blogs/BlogList';
import BlogFrom from '../blogs/BlogForm';
import './layout.css';

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div style={{ margin: 88 }}>
        <h2 className='center roboto' id='heading'>
          Welcome to Sams Blog application where you can customize and create
          your <i style={{ fontFamily: 'monospace' }}>own blogs</i> from scratch
        </h2>
        {user ? (
          <p className='center' style={{ fontSize: 20 }}>
            Welcome <i id='name-ani'>{user.name}</i>
          </p>
        ) : (
          <div className='center'>
            <p style={{ fontSize: 22 }}>
              Create your own user or login if you already have one
            </p>
            <Button
              variant='contained'
              color='primary'
              className='landing-button'
            >
              <Link to='register' className='link'>
                Sign Up
              </Link>
            </Button>
            <Button variant='contained'>
              <Link
                to='login'
                style={{ color: 'black', textDecoration: 'none' }}
              >
                Log in
              </Link>
            </Button>
          </div>
        )}
      </div>

      <BlogList />
      <BlogFrom />
    </div>
  );
};
export default Landing;
