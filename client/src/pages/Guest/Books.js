import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import requireGuest from '../../hocs/requireGuest';
import Spinner from '../../components/Spinner/Spinner';

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5000/books/top_books', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('goodReadsToken'),
        },
      })

      .then(res => {
        setIsLoading(false);
        setBooks(res.data);
      });
  }, []);

  return (
    <section className='home'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='home__title'>
              <b>Popular Books</b>
            </h1>

            <button className='home__nav home__nav--prev' type='button'>
              <i className='icon ion-ios-arrow-round-back'></i>
            </button>
            <button className='home__nav home__nav--next' type='button'>
              <i className='icon ion-ios-arrow-round-forward'></i>
            </button>
          </div>
          {(isLoading && <Spinner />) || (
            <div className='col-12'>
              <div className='owl-carousel home__carousel'>
                {books.map(item => (
                  <div className='item' key={item._id}>
                    <div className='card card--big'>
                      {/* <div className='card__cover'>
                      <img src='assets/img/covers/cover.jpg' alt='' />
                      <a href='#' className='card__play'>
                        <i className='icon ion-ios-eye'></i>
                      </a>
                    </div> */}

                      <div className='card__content'>
                        <h3 className='card__title'>
                          <a style={{ color: 'black' }} href='#'>
                            {item.name}
                          </a>
                        </h3>
                        {/* <span className='card__category'>
                        <a href='#'>{item.category.name}</a>
                      </span>
                      <span className='card__rate'>
                        <i className='icon ion-ios-star'></i>8.4
                      </span> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default requireGuest(Books);
