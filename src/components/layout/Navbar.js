import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import NavDetails from './NavDetails';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <Button color='inherit'>
          <Link to='/'>home</Link>
        </Button>
        <Button color='inherit'>
          <Link to='/notes'>notes</Link>
        </Button>
        <Button color='inherit'>
          <Link to='/users'>users</Link>
        </Button>
        {user ? <NavDetails /> : <Link to='/login'>login</Link>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
