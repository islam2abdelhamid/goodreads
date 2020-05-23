import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = ({ isLogged, isAdmin }) => {
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
                  {isAdmin && (<li className='header__nav-item'>
                    <NavLink className='header__nav-link' to='/Admin'>
                    Admin Panel
                    </NavLink>
                
                  </li>)}
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
                  {!isLogged && (
                    <Link to='/login' className='header__sign-in'>
                      <i className='icon ion-ios-log-in'></i>
                      <span>sign in</span>
                    </Link>
                  )}

                  {isLogged && (
                    <Link to='/logout' className='header__sign-in'>
                      <i className='icon ion-ios-log-in'></i>
                      <span>logout</span>
                    </Link>
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
