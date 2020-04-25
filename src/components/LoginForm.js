import React from 'react';

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

export default LoginForm;
