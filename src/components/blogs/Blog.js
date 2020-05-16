import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlogRedux, likeBlog } from '../../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    dispatch(likeBlog(id));
  };

  const deleteBlog = async (id) => {
    dispatch(deleteBlogRedux(id));
  };

  return (
    <div style={blogStyle}>
      <div className='blogInfo' style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button className='toggleView' onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div className='blogInfoDetailed' style={showWhenVisible}>
        <p>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button className='like' value={blog.id} onClick={handleLike}>
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;