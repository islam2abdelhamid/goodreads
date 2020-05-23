import React, { useContext, useState } from 'react';
import axiosGuest from '../../axios/guest';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { REGISTER } from '../../context/AuthContext/actionTypes';
import requireGuest from '../../hocs/requireGuest';
import Spinner from '../../components/Spinner/Spinner';

const Register = props => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [avatarInput, setAvatarInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setPasswordConfirmation(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleAvatarChange = e => {
    setAvatarInput(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    if (avatarInput) {
      if (
        !['image/gif', 'image/jpeg', 'image/png'].includes(avatarInput.type)
      ) {
        setErrors(['image is not valid ']);
        return;
      } else if (avatarInput.size > 3e6) {
        setErrors(['image is too large']);
        return;
      }
    }

    try {
      const registerResult = await axiosGuest.post('users/register', {
        email,
        password,
        firstName,
        lastName,
        passwordConfirmation,
      });

      if (avatarInput) {
        const formData = new FormData();
        formData.append('avatar', avatarInput);
        await axiosGuest.post('users/profile/avatar', formData, {
          headers: {
            Authorization: `Bearer ${registerResult.data.token}`,
          },
          'content-type': 'multipart/form-data',
        });
      }

      setIsLoading(false);
      context.dispatch({
        type: REGISTER,
        payload: registerResult.data,
      });
    } catch (error) {
      setIsLoading(false);
      setErrors([error.response.data.message]);
    }
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
                    <input
                      type='file'
                      className='sign__input'
                      onChange={handleAvatarChange}
                    />
                  </div>

                  {errors.length > 0 && (
                    <ul>
                      {errors.map(error => (
                        <li className='text-theme' key={error}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}

                  <button className='sign__btn' type='submit'>
                    Sing Up
                  </button>

                  <span className='sign__text'>
                    You already have an account? <Link to='/login'>Login!</Link>
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
export default requireGuest(Register);
