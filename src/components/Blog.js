import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBlogRedux } from '../reducers/blogReducer';

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
    /*e.preventDefault();
    const id = e.target.value;
    //find blog with that id
    const blog = blogs.find((blog) => blog.id === id);
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const updatedBlog = await blogService.update(changedBlog, id);
    //setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
    */
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
