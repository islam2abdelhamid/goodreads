import React, { useContext, useState } from 'react';
import axiosGuest from '../../axios/guest';
import { Link } from 'react-router-dom';
import Spinner from './../../components/Spinner/Spinner';

import { AuthContext } from '../../context/AuthContext';
import { LOGIN } from '../../context/AuthContext/actionTypes';
import requireGuest from '../../hocs/requireGuest';

const Login = props => {
  const context = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsloading(true);
    axiosGuest
      .post('users/login', {
        email,
        password,
      })
      .then(result => {
        setIsloading(false);
        context.dispatch({
          type: LOGIN,
          payload: result.data,
        });
      })
      .catch(err => {
        setIsloading(false);
        if (err.response) setErrors([err.response.data.message]);
        else console.log(err);
      });
  };
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='sign__content'>
              {(isLoading && <Spinner />) || (
                <form action='#' className='sign__form' onSubmit={handleSubmit}>
                  <Link to='/' className='header__logo logo'>
                    Book<span>Flix</span>
                  </Link>

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
                      {errors.map(error => (
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
                    Don't have an account? <Link to='/register'>Sign up!</Link>
                  </span>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default requireGuest(Login);
