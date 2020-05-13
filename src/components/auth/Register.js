import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  });

  const { name, email, password, password2, errors } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2,
    };
    console.log(newUser);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to
            home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className='grey-text text-darken-1'>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={(e) => onSubmit(e)}>
            <div className='input-field col s12'>
              <input
                onChange={(e) => onChange(e)}
                value={name}
                id='name'
                type='text'
                required
                name='name'
              />
              <label htmlFor='name'>Name</label>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={(e) => onChange(e)}
                value={email}
                id='email'
                type='email'
                name='email'
                required
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={(e) => onChange(e)}
                value={password}
                id='password'
                type='password'
                name='password'
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s12'>
              <input
                onChange={(e) => onChange(e)}
                value={password2}
                id='password2'
                type='password'
                name='password2'
                required
              />
              <label htmlFor='password2'>Confirm Password</label>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type='submit'
                className='btn btn-large waves-effect waves-light hoverable blue accent-3'
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
