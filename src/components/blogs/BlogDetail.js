import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteBlogRedux,
  likeBlog,
  commentBlog,
} from '../../reducers/blogReducer';
import { setNotification } from '../../reducers/notificationReducer';
import { useHistory } from 'react-router-dom';

const BlogDetail = ({ blog }) => {
  const [comment, setComment] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLike = async (e) => {
    e.preventDefault();
    const id = e.target.value;
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
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

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
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input
          onChange={onChange}
          type='text'
          id='comment'
          name='comment'
          value={comment}
        />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={() => deleteBlog(blog.id)}>remove</button>
    </div>
  );
};

export default BlogDetail;
