import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, handleChange, password, username }) => {
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
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
