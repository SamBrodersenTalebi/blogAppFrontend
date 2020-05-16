import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <h2>
        Welcome to Sams Blog application where you can customize and create your{' '}
        <i>own blogs</i> from scratch
      </h2>
      {user ? (
        <p>Welcome {user.name}</p>
      ) : (
        <div>
          <p>Create your own user or login if you already have one</p>
          <Button variant='contained' color='primary'>
            <Link to='register'>Sign Up</Link>
          </Button>
          <Button variant='contained'>
            <Link to='login'>Log in</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default Landing;
