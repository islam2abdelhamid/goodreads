import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';

import axios from '../../axios';
import requireGuest from '../../hocs/requireGuest';
import BookCard from '../../components/Guest/BookCard';

function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/books/top_books')

      .then(res => {
        setBooks(books.concat(res.data));
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/categories/top_categories')

      .then(res => {
        setCategories(categories.concat(res.data));
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/authors/top_authors')

      .then(res => {
        setAuthors(authors.concat(res.data));
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
          </div>

          <div className='col-12 mt-5'>
            {books.length > 0 && (
              <OwlCarousel className='owl-theme' margin={10} items={4} nav>
                {books.map(item => (
                  <BookCard book={item} key={item._id} />
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
      <section
        className='section section--bg'
        data-bg='img/section/section.jpg'
      >
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <h2 className='section__title'>Popular Authors</h2>
              <ul className='author__list'>
                {authors.map(item => (
                  <li key={item._id}>
                    <Link to={`/authors/${item._id}`}>
                      {item.firstName + ' ' + item.lastName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='col-6'>
              <h2 className='section__title'>Popular Categories</h2>
              <ul className='author__list'>
                {categories.map(item => (
                  <li key={item._id}>
                    <Link to={'/categories/' + item._id}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default requireGuest(Books);
