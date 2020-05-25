import React from 'react';
import moment from 'moment';

export const Reviews = ({ reviews }) => {
  return (
    <section class='content'>
      <div class='content__head'>
        <div class='container'>
          <div class='row'>
            <div class='col-12'>
              <h2 class='content__title'>Reviews</h2>

              <div class='content__mobile-tabs' id='content__mobile-tabs'>
                <div
                  class='content__mobile-tabs-btn dropdown-toggle'
                  role='navigation'
                  id='mobile-tabs'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <input type='button' value='Comments' />
                  <span></span>
                </div>

                <div
                  class='content__mobile-tabs-menu dropdown-menu'
                  aria-labelledby='mobile-tabs'
                >
                  <ul class='nav nav-tabs' role='tablist'>
                    <li class='nav-item'>
                      <a
                        class='nav-link active'
                        id='1-tab'
                        data-toggle='tab'
                        href='#tab-1'
                        role='tab'
                        aria-controls='tab-1'
                        aria-selected='true'
                      >
                        Comments
                      </a>
                    </li>

                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        id='2-tab'
                        data-toggle='tab'
                        href='#tab-2'
                        role='tab'
                        aria-controls='tab-2'
                        aria-selected='false'
                      >
                        Reviews
                      </a>
                    </li>

                    <li class='nav-item'>
                      <a
                        class='nav-link'
                        id='3-tab'
                        data-toggle='tab'
                        href='#tab-3'
                        role='tab'
                        aria-controls='tab-3'
                        aria-selected='false'
                      >
                        Photos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='container'>
        <div class='row'>
          <div class='col-12 col-lg-8 col-xl-8'>
            <div class='tab-content' id='myTabContent'>
              <div
                class='tab-pane fade show active'
                id='tab-1'
                role='tabpanel'
                aria-labelledby='1-tab'
              >
                <div class='row'>
                  <div class='col-12'>
                    <div class='reviews'>
                      <ul class='reviews__list'>
                        {reviews.map(review => (
                          <li class='reviews__item'>
                            <div class='reviews__autor'>
                              <img
                                class='reviews__avatar'
                                src={review.userId.avatar}
                                alt=''
                              />
                              <span class='reviews__name'>
                                {review.bookId.name}
                              </span>
                              <span class='reviews__time'>
                                {moment(review.createdAt)
                                  .startOf('hour')
                                  .fromNow()}{' '}
                                by{' '}
                                {review.userId.firstName +
                                  ' ' +
                                  review.userId.lastName}
                              </span>

                              <span class='reviews__rating'>
                                <i class='icon ion-ios-star'></i> {review.rate}
                              </span>
                            </div>
                            <p class='reviews__text'>{review.comment}</p>
                          </li>
                        ))}
                      </ul>

                      <form action='#' class='form'>
                        <textarea
                          class='form__textarea'
                          placeholder='Review'
                        ></textarea>
                        <div class='form__slider'>
                          <input
                            id='hidden_rate_input'
                            type='hidden'
                            value='0'
                          />

                          <div
                            class='form__slider-rating'
                            id='slider__rating'
                          ></div>
                          <div
                            class='form__slider-value'
                            id='form__slider-value'
                          ></div>
                        </div>
                        <button type='button' class='form__btn'>
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
