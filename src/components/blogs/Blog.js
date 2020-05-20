import React from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
    height: '100px',
    backgroundColor: '#CBD4DB',
  };

  return (
    <div style={blogStyle}>
      <div className='blogInfo'>
        <Link
          className='blog-list'
          style={{ textDecoration: 'none', color: 'black' }}
          to={`/blogs/${blog.id}`}
        >
          <h4>
            Author:
            <i className='author'>{blog.author}</i>
          </h4>
          <p
            style={{ margin: 4, textDecoration: 'underline' }}
            className='blog-link'
          >
            {blog.title.substring(0, 20)}....
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
