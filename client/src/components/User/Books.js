import React, {  useState, useEffect } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth';
import { Link } from 'react-router-dom';
import defaultImage from './defaultImage.jpg';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [activeLinkIndex, setActiveLinkIndex] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    axios
      .get('/books')
      .then(result => {
        setBooks(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: true,
    },
    itemCard: {
      margin: '10px',
      padding: '10px',
      width: '28%',
    },
    section: {
      backgroundImage: `url("assets/img/section/section.jpg")`,
    },
  };

  //get Current Books
  const indexOfLastBook = booksPerPage * currentPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  //paginate
  const paginate = pageNo => setCurrentPage(pageNo);
  const paginatePrev = () => setCurrentPage(currentPage - 1);
  const paginateNext = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <section
        className='section section--first section--bg'
        data-bg='assets/img/section/section.jpg'
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='section__wrap'>
                <h2 className='section__title'>Books </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='catalog'>
        <div className='container'>
          <div className='row'>
            <div className='row' style={styles.container}>
              {currentBooks.map(book => (
                <div
                  className='card card--big'
                  style={styles.itemCard}
                  key={book._id}
                >
                  <div className='card__cover'>
                    <img
                      className='img-thumbnail rounded table__img'
                      src={
                        (book.cover && 'http://localhost:5000/' + book.cover) ||
                        defaultImage
                      }
                      alt='book'
                    />
                    <Link to={'/books/' + book._id} className='card__play'>
                      <i className='icon ion-ios-eye'></i>
                    </Link>
                  </div>
                  <div className='card__content'>
                    <h3 className='card__title'>
                      <Link to={'/books/' + book._id}>{book.name}</Link>
                    </h3>
                    <span className='card__category'>
                      {book.category && (
                        <Link
                          style={{ fontSize: '125%' }}
                          to={'/categories/' + book.category._id}
                        >
                          <strong>{book.category.name}</strong>
                        </Link>
                      )}
                      <Link
                        style={{ fontSize: '125%' }}
                        to={'/authors/' + book.author._id}
                      >
                        by :{' '}
                        <strong>
                          {book.author.firstName} {book.author.lastName}
                        </strong>
                      </Link>
                    </span>
                    <span className='card__rate'>
                      <i className='icon ion-ios-star'></i> {book.rate || '0'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-12'>
              <ul className='paginator paginator--list'>
              <li class="paginator__item paginator__item--prev">
                <a
                 onClick={e => {
                  e.preventDefault();
                  paginatePrev();
                  setActiveLinkIndex(currentPage - 1);
                }}
                 href="#"><i class="icon ion-ios-arrow-back"></i></a>
              </li>
                {pageNumbers.map(number => (
                  <li
                    key={number}
                    className={
                      activeLinkIndex === number
                        ? 'paginator__item paginator__item--active'
                        : 'paginator__item'
                    }
                  >
                    <a
                      onClick={e => {
                        e.preventDefault();
                        paginate(number);
                        setActiveLinkIndex(number);
                      }}
                      href='!#'
                    >
                      {number}
                    </a>
                  </li>
                ))}
                <li class="paginator__item paginator__item--next">
                  <a 
                   onClick={e => {
                    e.preventDefault();
                    paginateNext();
                    setActiveLinkIndex(currentPage + 1);
                  }}
                  href="#"><i class="icon ion-ios-arrow-forward"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default requireAuth(Books);
