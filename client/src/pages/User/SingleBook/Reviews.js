import React, { useState } from 'react';
import moment from 'moment';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import loggedAxios from '../../../axios/logged.js';
import './FormSlider.css';

export const Reviews = ({ reviews, book, getReviews }) => {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const handleSlide = (render, handle, value, un, percent) => {
    setRate(value[0].toFixed(1));
  };

  const [errors, setErrors] = useState([]);

  const handleCommentChange = e => {
    setComment(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (comment && rate) {
      loggedAxios
        .post('books/' + book._id + '/reviews', {
          rate,
          comment,
        })
        .then(result => {
          setComment('');
          setErrors([]);
          getReviews();
        })
        .catch(err => {
          setErrors([err.response.data]);
        });
    } else {
      setErrors(['comment or rate can not be empty']);
    }
  };
  return (
    <section className='content'>
      <div className='content__head'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h2 className='content__title'>Reviews</h2>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-12 col-lg-8 col-xl-8'>
            <div className='tab-content' id='myTabContent'>
              <div
                className='tab-pane fade show active'
                id='tab-1'
                role='tabpanel'
                aria-labelledby='1-tab'
              >
                <div className='row'>
                  <div className='col-12'>
                    <div className='reviews'>
                      <ul className='reviews__list'>
                        {reviews.map(review => (
                          <li className='reviews__item' key={review._id}>
                            <div className='reviews__autor'>
                              <img
                                className='reviews__avatar'
                                src={review.userId.avatar}
                                alt=''
                              />
                              <span className='reviews__name'>
                                {review.bookId.name}
                              </span>
                              <span className='reviews__time'>
                                {moment(review.createdAt)
                                  .startOf('hour')
                                  .fromNow()}{' '}
                                by{' '}
                                {review.userId.firstName +
                                  ' ' +
                                  review.userId.lastName}
                              </span>

                              <span className='reviews__rating'>
                                <i className='icon ion-ios-star'></i>{' '}
                                {review.rate}
                              </span>
                            </div>
                            <p className='reviews__text'>{review.comment}</p>
                          </li>
                        ))}
                      </ul>

                      <form action='#' className='form' onSubmit={handleSubmit}>
                        <textarea
                          className='form__textarea'
                          placeholder='Review'
                          onChange={handleCommentChange}
                          value={comment}
                        />
                        <div className='form__slider'>
                          <input
                            id='hidden_rate_input'
                            type='hidden'
                            value='0'
                          />

                          <Nouislider
                            className='form__slider-rating'
                            id='slider__rating'
                            onSlide={handleSlide}
                            start={0}
                            connect
                            range={{
                              min: 0,
                              max: 5,
                            }}
                            step={0.1}
                            behaviour='tap'
                          />

                          <div
                            className='form__slider-value'
                            id='form__slider-value'
                          >
                            {rate}
                          </div>
                        </div>
                        {errors.length && (
                          <ul>
                            {errors.map(error => (
                              <li className='text-danger' key={error}>
                                {error}
                              </li>
                            ))}
                          </ul>
                        )}
                        <button type='submit' className='form__btn'>
                          Send
                        </button>
                      </form>
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
