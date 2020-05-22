import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../reducers/blogReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { TextField, Button } from '@material-ui/core';

const BlogForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formDataBlog, setFormDataBlog] = useState({
    author: '',
    title: '',
    url: '',
  });
  const { title, author, url } = formDataBlog;

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const { title, author, url } = formDataBlog;

    const newBlog = {
      title,
      author,
      url,
    };
    console.log(newBlog);
    //blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
    const notificationContent = `you have created '${title}'`;
    dispatch(
      setNotification({ content: notificationContent, status: 'success' }, 3)
    );
    setFormDataBlog({ author: '', title: '', url: '' });
  };

  const handleBlogChange = (e) => {
    setFormDataBlog({ ...formDataBlog, [e.target.name]: e.target.value });
  };

  if (!user) return null;

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: 5 }}>Create new post</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <TextField
            label='title'
            id='title'
            name='title'
            value={title}
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <div>
          <TextField
            label='author'
            id='author'
            name='author'
            value={author}
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <div>
          <TextField
            label='url'
            id='url'
            name='url'
            value={url}
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant='contained' color='primary' type='submit'>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
