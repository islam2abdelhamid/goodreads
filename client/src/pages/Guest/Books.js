import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import requireGuest from '../../hocs/requireGuest';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books/top_books', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('goodReadsToken'),
        },
      })

      .then(res => {
        setBooks(res.data);
        console.log(res.data);
      });
  }, []);
  

  return (
    <section class='home'>
      <div class='container'>
        <div class='row'>
          <div class='col-12'>
            <h1 class='home__title'>
              <b>Popular Books</b>
            </h1>

            <button class='home__nav home__nav--prev' type='button'>
              <i class='icon ion-ios-arrow-round-back'></i>
            </button>
            <button class='home__nav home__nav--next' type='button'>
              <i class='icon ion-ios-arrow-round-forward'></i>
            </button>
          </div>
          <div class='col-12'>
            <div class='owl-carousel home__carousel'>
              {books.map(item => (
                <div class='item'>
                  <div class='card card--big'>
                    <div class='card__cover'>
                      <img src='assets/img/covers/cover.jpg' alt='' />
                      <a href='#' class='card__play'>
                        <i class='icon ion-ios-eye'></i>
                      </a>
                    </div>

                    <div class='card__content'>
                      <h3 class='card__title'>
                        <a style={{ color: 'black' }} href='#'>
                          {item.name}
                        </a>
                      </h3>
                      <span class='card__category'>
                        <a href='#'>{item.category.name}</a>
                      </span>
                      <span class='card__rate'>
                        <i class='icon ion-ios-star'></i>8.4
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default requireGuest(Books);
