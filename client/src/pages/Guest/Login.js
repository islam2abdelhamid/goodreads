import React, { useContext, useState, useEffect } from 'react';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { LOGIN, LOGOUT } from '../../context/AuthContext/actionTypes';
import requireGuest from '../../hocs/requireGuest';

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('users/login', {
        email,
        password,
      })
      .then((result) => {
        context.dispatch({
          type: LOGIN,
          payload: result.data,
        });
        setRedirect(true);
      })
      .catch((err) => {
        if (err.response) setErrors(errors.concat(err.response.data.message));
        else console.log(err);
      });
  };
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <div className='container'>
        {redirect && <Redirect to='/' />}
        <div className='row'>
          <div className='col-12'>
            <div className='sign__content'>
              <form action='#' className='sign__form' onSubmit={handleSubmit}>
                <a href='index.html' className='header__logo logo'>
                  Book<span>Flix</span>
                </a>

                <div className='sign__group'>
                  <input
                    type='email'
                    className='sign__input'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div className='sign__group'>
                  <input
                    type='password'
                    className='sign__input'
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                {errors.length > 0 && (
                  <ul>
                    {errors.map((error) => (
                      <li className='text-theme' key='error'>
                        {error}
                      </li>
                    ))}
                  </ul>
                )}

                <button className='sign__btn' type='submit'>
                  Sign in
                </button>

                <span className='sign__text'>
                  Don't have an account? <a href='signup.html'>Sign up!</a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default requireGuest(Login);
