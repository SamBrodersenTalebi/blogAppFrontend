import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlogRedux, likeBlog } from '../../reducers/blogReducer';
import { Redirect } from 'react-router-dom';

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const handleLike = async (e) => {
    e.preventDefault();
    const id = e.target.value;
    dispatch(likeBlog(id));
  };

  const deleteBlog = async (id) => {
    dispatch(deleteBlogRedux(id));
  };
  console.log(blog);

  if (!blog) {
    return null;
  }
  return (
    <div>
      <p>{blog.title}</p>
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
  );
};

export default BlogDetail;
