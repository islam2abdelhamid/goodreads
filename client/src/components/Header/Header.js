import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import defaultAvatar from './default.png';
export const Header = ({ isAdmin, isLoaded, user }) => {
  return (
    <header className='header'>
      <div className='header__wrap'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='header__content'>
                <Link to='/' className='header__logo logo'>
                  Book<span>Flix</span>
                </Link>

                <ul className='header__nav'>
                  <li className='header__nav-item'>
                    <NavLink className='header__nav-link' to='/'>
                      Home
                    </NavLink>
                  </li>
                  {isAdmin && (
                    <li className='header__nav-item'>
                      <NavLink className='header__nav-link' to='/Admin'>
                        Admin Panel
                      </NavLink>
                    </li>
                  )}
                  <li className='header__nav-item'>
                    <NavLink className='header__nav-link' to='/Books'>
                      Books
                    </NavLink>
                  </li>
                </ul>
                <div className='header__auth'>
                  <button className='header__search-btn' type='button'>
                    <i className='icon ion-ios-search'></i>
                  </button>

                  {isLoaded && (
                    <>
                      {!user && (
                        <Link to='/login' className='header__sign-in'>
                          <i className='icon ion-ios-log-in'></i>
                          <span>sign in</span>
                        </Link>
                      )}

                      {user && (
                        <div>
                          <ul className='navbar-nav ml-auto nav-flex-icons'>
                            <li className='nav-item avatar dropdown'>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a
                                className='nav-link dropdown-toggle'
                                data-toggle='dropdown'
                              >
                                <img
                                  src={
                                    (user.avatar &&
                                      'http://localhost:5000' + user.avatar) ||
                                    defaultAvatar
                                  }
                                  className='rounded-circle z-depth-0'
                                  alt='avatar'
                                  width='70'
                                />
                                <span className='user_name'>
                                  {user.firstName} {user.lastName}
                                </span>
                              </a>
                              <div
                                className='dropdown-menu dropdown-menu-lg-right dropdown-secondary'
                                aria-labelledby='navbarDropdownMenuLink-55'
                              >
                                <Link to='/logout' className='dropdown-item'>
                                  <i className='icon ion-ios-log-in'></i>
                                  <span>logout</span>
                                </Link>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form action='#' className='header__search'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='header__search-content'>
                <input
                  type='text'
                  placeholder='Search for a movie, TV Series that you are looking for'
                />
                <button type='button'>search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};
