import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, blogCreated, id) {
  return { name, blogCreated, id };
}

export default function UserList() {
  const users = useSelector((state) => state.users);
  const classes = useStyles();
  let rows = [];

  users.map((item) => {
    let number = item.blogs.length;
    let username = item.username;
    let id = item.id;
    rows.push(createData(username, number, id));
  });

  console.log(rows);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align='right'>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                <Link to={`/users/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align='right'>{row.blogCreated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
