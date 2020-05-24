import React from 'react';

export const Reviews = () => {
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
                        <li class='reviews__item'>
                          <div class='reviews__autor'>
                            <img
                              class='reviews__avatar'
                              src='img/user.png'
                              alt=''
                            />
                            <span class='reviews__name'>
                              Best Marvel movie in my opinion
                            </span>
                            <span class='reviews__time'>
                              24.08.2018, 17:53 by John Doe
                            </span>

                            <span class='reviews__rating'>
                              <i class='icon ion-ios-star'></i>8.4
                            </span>
                          </div>
                          <p class='reviews__text'>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which don't look even slightly believable. If
                            you are going to use a passage of Lorem Ipsum, you
                            need to be sure there isn't anything embarrassing
                            hidden in the middle of text.
                          </p>
                        </li>
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
