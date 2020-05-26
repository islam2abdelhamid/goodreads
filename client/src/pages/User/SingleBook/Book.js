import React, { useState, useEffect } from 'react';
import loggedAxios from '../../../axios/logged';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Book = ({ book }) => {
  const [bookStatus, setBookStatus] = useState({ code: -1, status: 'Shelve' });

  const notify = () => toast('Status Changed !');

  useEffect(() => {
    console.log(bookStatus);
    if (bookStatus.code !== -1) {
      loggedAxios
        .patch('books/' + book._id + '/change-status', {
          status: bookStatus.code,
        })
        .then(result => {
          notify();
        });
    }
  }, [bookStatus]);
  return (
    <section className='section details'>
      <div className='details__bg' data-bg='img/home/home__bg.jpg'></div>

      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='details__title'>{book.name}</h1>
          </div>

          <div className='col-12 col-xl-6'>
            <div className='card card--details'>
              <div className='row'>
                <div className='col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5'>
                  <div className='card__cover'>
                    <img src={(book.cover && 'http://localhost:5000' + book.cover)} alt='No Cover' />
                  </div>
                </div>
                <div className='col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7'>
                  <div className='card__content'>
                    <div className='card__wrap'>
                      <span className='card__rate'>
                        <i className='icon ion-ios-star'></i> {book.rate || '0'}
                      </span>
                    </div>

                    <ul className='card__meta'>
                      <li>
                        <span>Category:</span>
                        {book.category && <a href='#'>{book.category.name}</a>}
                      </li>
                      <li>
                        <span>Author:</span>
                        {book.author && (
                          <a href={'/authors/' + book.author._id}>
                            {book.author.firstName} {book.author.lastName}
                          </a>
                        )}
                      </li>
                    </ul>

                    <div className='filter__item' id='filter__quality'>
                      <div
                        className='filter__item-btn dropdown-toggle'
                        role='navigation'
                        id='filter-quality'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <ToastContainer />
                        <input type='button' value={bookStatus.status} />
                        <span></span>
                      </div>

                      <ul
                        className='filter__item-menu dropdown-menu scrollbar-dropdown'
                        aria-labelledby='filter-quality'
                      >
                        <li
                          onClick={() =>
                            setBookStatus({ code: 2, status: 'want to read' })
                          }
                        >
                          want to read
                        </li>
                        <li
                          onClick={() =>
                            setBookStatus({ code: 0, status: 'reading' })
                          }
                        >
                          reading
                        </li>
                        <li
                          onClick={() =>
                            setBookStatus({ code: 1, status: 'read' })
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
        </div>
      </div>
    </section>
  );
};
