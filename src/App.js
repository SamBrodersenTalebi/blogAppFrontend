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
  const [message, setMessage] = useState('');

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
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formDataLogin;
    try {
      const user = await loginService.login({ username, password });

      if (!user) {
      }
      //save user to local storage:
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      //user it object with token, name and username.
      setUser(user);
      setFormDataLogin({
        password: '',
        username: '',
      });
      setMessage('Login Sucessfull');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setMessage('Invalid user or password');
      setTimeout(() => {
        setMessage(null);
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
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      setFormDataBlog({ author: '', title: '', url: '' });
      setMessage('New blog was created');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlogChange = (e) => {
    setFormDataBlog({ ...formDataBlog, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
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
    console.log('id:', id);
    await blogService.remove(id);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
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
      <Notification message={message} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={() => logOut()}>logout</button>
      </p>
      <Togglable buttonLabel='New blog'>
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
