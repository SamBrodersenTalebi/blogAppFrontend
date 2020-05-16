import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialBlogs } from '../../reducers/blogReducer';
import Blog from './Blog';

export default function BlogList() {
  const dispatch = useDispatch();
  let blogs = useSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(initialBlogs());
  }, []);
  return (
    <div>
      {blogs.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  );
}
