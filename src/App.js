import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initialBlogs, createBlog } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = React.createRef();
  const [user, setUser] = useState(null);
  const [formDataBlog, setFormDataBlog] = useState({
    author: '',
    title: '',
    url: '',
  });
  let blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initialBlogs());
    //get blogs
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      //parse back to Javascript
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      console.log(user.token);
    }
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const { title, author, url } = formDataBlog;
    try {
      const newBlog = {
        title,
        author,
        url,
      };
      console.log('bearer ' + user.token);
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(newBlog));
      setFormDataBlog({ author: '', title: '', url: '' });
      dispatch(setNotification('New blog was created', 3));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogChange = (e) => {
    setFormDataBlog({ ...formDataBlog, [e.target.name]: e.target.value });
  };

  const handleBlogLike = async (e) => {
    e.preventDefault();
    console.log('hello');
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
  };

  const deleteBlog = async (id) => {
    try {
      console.log('id:', id);
      await blogService.remove(id);
      const blogs = await blogService.getAll();
      //setBlogs(blogs);
    } catch (error) {
      dispatch(setNotification('Not authorized', 3));
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel='Login'>
          <LoginForm
            password={formDataLogin.password}
            username={formDataLogin.username}
            onSubmit={handleLoginSubmit}
            handleChange={handleLoginChange}
          />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={() => logOut()}>logout</button>
      </p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm
          url={formDataBlog.url}
          author={formDataBlog.author}
          title={formDataBlog.title}
          onSubmit={handleBlogSubmit}
          onChange={handleBlogChange}
        />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleBlogLike}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
