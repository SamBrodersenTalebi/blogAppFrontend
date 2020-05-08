import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [formDataLogin, setFormDataLogin] = useState({
    password: '',
    username: '',
  });
  const [formDataBlog, setFormDataBlog] = useState({
    author: '',
    title: '',
    url: '',
  });
  const [message, setMessage] = useState({
    message: null,
    error: false,
  });

  const blogFormRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formDataLogin;
    try {
      const user = await loginService.login({ username, password });
      //save user to local storage:
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      //user it object with token, name and username.
      setUser(user);
      setFormDataLogin({
        password: '',
        username: '',
      });
      setMessage({
        message: 'Login Sucessfull',
        error: false,
      });
      setTimeout(() => {
        setMessage({
          message: null,
          error: false,
        });
      }, 5000);
    } catch (error) {
      setMessage({
        message: 'Invalid user or password',
        error: true,
      });
      setTimeout(() => {
        setMessage({
          message: null,
          error: false,
        });
      }, 5000);
      console.log(error);
    }
  };

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
      console.log(newBlog);
      console.log('bearer ' + user.token);
      blogFormRef.current.toggleVisibility();
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      setFormDataBlog({ author: '', title: '', url: '' });
      setMessage({
        message: 'New blog was created',
        error: false,
      });
      setTimeout(() => {
        setMessage({
          message: null,
          error: false,
        });
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogChange = (e) => {
    setFormDataBlog({ ...formDataBlog, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
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
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
  };

  const deleteBlog = async (id) => {
    try {
      console.log('id:', id);
      await blogService.remove(id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      console.log(error);
      setMessage({
        message: 'Not authorized',
        error: true,
      });
      setTimeout(() => {
        setMessage({
          message: null,
          error: false,
        });
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message.message} error={message.error} />
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
      <Notification message={message.message} error={message.error} />
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
