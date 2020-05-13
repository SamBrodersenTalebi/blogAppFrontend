import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/authReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formDataLogin, setFormDataLogin] = useState({
    password: '',
    username: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formDataLogin;
    const credentials = { username, password };
    dispatch(login(credentials));
    setFormDataLogin({
      password: '',
      username: '',
    });
  };

  const handleLoginChange = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLoginSubmit}>
        <div>
          username
          <input
            type='text'
            value={formDataLogin.username}
            name='username'
            onChange={(e) => handleLoginChange(e)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={formDataLogin.password}
            name='password'
            onChange={(e) => handleLoginChange(e)}
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
