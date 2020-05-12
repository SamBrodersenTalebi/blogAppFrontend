import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const BlogForm = () => {
  const dispatch = useDispatch();
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
    //blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
    setFormDataBlog({ author: '', title: '', url: '' });
  };

  const handleBlogChange = (e) => {
    setFormDataBlog({ ...formDataBlog, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='title'
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='author'
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='url'
            onChange={(e) => handleBlogChange(e)}
          />
        </div>
        <button id='create-blog' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
