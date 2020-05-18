import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavDetails from './NavDetails';
import './layout.css';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <SubjectIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          <Link to='/' className='link'>
            SamBlog
          </Link>
        </Typography>
        <Button color='inherit'>
          <Link to='/' className='link'>
            home
          </Link>
        </Button>
        <Button color='inherit'>
          <Link to='/users' className='link'>
            users
          </Link>
        </Button>
        <Button color='inherit'>
          {user ? (
            <NavDetails />
          ) : (
            <Link to='/login' className='link'>
              login
            </Link>
          )}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
