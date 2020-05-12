import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, handleChange, password, username }) => {
  const [formDataLogin, setFormDataLogin] = useState({
    password: '',
    username: '',
  });

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
      dispatch(setNotification('Login Sucessfull', 3));
    } catch (error) {
      dispatch(setNotification('Invalid user or password', 3));
      console.log(error);
    }
  };

  const handleLoginChange = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={onSubmit}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
