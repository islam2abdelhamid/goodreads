import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from './defaultBook.jpg';
import { ToastContainer, toast } from 'react-toastify';

const AuthorBooks = ({ book , bookStatus , setBookStatus ,setBook }) => {
  return (
    <div className='col-6 col-sm-12 col-lg-6'>
      <div className='card card--list'>
        <div className='row'>
          <div className='col-12 col-sm-4'>
            <div className='card__cover'>
              <img
                className='img-thumbnail rounded table__img'
                src={
                  (book.cover && 'http://localhost:5000' + book.cover) ||
                  defaultImage
                }
                alt='book'
              />
              <Link to={'/books/' + book._id} className='card__play'>
                <i className='icon ion-ios-eye'></i>
              </Link>
            </div>
          </div>

          <div className='col-12 col-sm-8'>
            <div className='card__content'>
              <h3 className='card__title ml-5'>
                <Link to={'/books/' + book._id}>{book.name}</Link>
              </h3>

              <div className='card__wrap'>
                <span className='card__rate'>
                  <i className='icon ion-ios-star ml-5'></i>
                  {book.rate || 0}
                </span>
              </div>
              <div style={{marginLeft:"50px"}} className='filter__item' id='filter__quality'>
                      <div
                        className='filter__item-btn dropdown-toggle'
                        role='navigation'
                        id='filter-quality'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <ToastContainer />
                        <input type='button' value="Shelve" />
                        <span></span>
                      </div>

                      <ul
                        className='filter__item-menu dropdown-menu scrollbar-dropdown'
                        aria-labelledby='filter-quality'
                      >
                        <li
                          onClick={() =>{
                              setBookStatus({ code: 2, status: 'want to read' })
                              setBook(book)
                            }
                          }
                        >
                          want to read
                        </li>
                        <li
                          onClick={() =>{
                              setBookStatus({ code: 0, status: 'reading' })
                              setBook(book)
                            }
                          }
                        >
                          reading
                        </li>
                        <li
                          onClick={() =>{
                              setBookStatus({ code: 1, status: 'read' })
                              setBook(book)
                            }
                          }
                        >
                          read
                        </li>
                      </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBooks;
