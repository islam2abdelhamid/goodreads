import React, { useContext, useState, useRef } from 'react';
import axios from '../../axios';
import { Redirect, Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { LOGIN, REGISTER } from '../../context/AuthContext/actionTypes';
import requireGuest from '../../hocs/requireGuest';

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [redirect, setRedirect] = useState(false);
  const fileInput = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('users/register', {
        email,
        password,
        firstName,
        lastName,
        passwordConfirmation
      })
      .then((result) => {
        context.dispatch({
          type: REGISTER,
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
                    type='text'
                    className='sign__input'
                    placeholder='First Name'
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </div>

                <div className='sign__group'>
                  <input
                    type='text'
                    className='sign__input'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
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
                <div className='sign__group'>
                  <input
                    type='password'
                    className='sign__input'
                    placeholder='Confirm Password'
                    value={passwordConfirmation}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <div className='sign__group'>
                  <input ref={fileInput} type='file' className='sign__input' />
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
                  You already have an account? <Link to='/login'>Login!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default requireGuest(Register);
