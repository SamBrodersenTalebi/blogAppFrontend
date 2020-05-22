import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteBlogRedux,
  likeBlog,
  commentBlog,
} from '../../reducers/blogReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

const BlogDetail = ({ blog }) => {
  const [comment, setComment] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const center = { textAlign: 'center' };

  const handleLike = async (e) => {
    e.preventDefault();
    const id = blog.id;
    dispatch(likeBlog(id));
    dispatch(setNotification('Liked blog', 2));
  };

  const deleteBlog = async (id) => {
    try {
      dispatch(deleteBlogRedux(id, blog.title));
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    const id = blog.id;
    let content = { comment };
    dispatch(commentBlog(content, id));
    setComment('');
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h1 style={center}>{blog.title}</h1>
      <div style={center}>
        <p>
          Url:<i>{blog.url}</i>
        </p>
        <p>
          Blog likes: {blog.likes}
          <Button
            variant='contained'
            color='secondary'
            className='like'
            value={blog.id}
            onClick={handleLike}
            style={{ marginLeft: 10 }}
          >
            LIKE
          </Button>
        </p>
        <p>
          Author: <i>{blog.author}</i>
        </p>
      </div>

      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <div>
          <TextField
            label='comment'
            value={comment}
            id='comment'
            name='comment'
            onChange={onChange}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button variant='contained' color='primary' type='submit'>
            Add comment
          </Button>
        </div>
      </form>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => deleteBlog(blog.id)}
      >
        Remove post
      </Button>
    </div>
  );
};

export default BlogDetail;
