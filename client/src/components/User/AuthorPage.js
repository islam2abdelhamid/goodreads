import React, { useState, useEffect } from 'react';

import requireAuth from '../../hocs/requireAuth';
import axios from '../../axios/logged';
import { useParams, Link } from 'react-router-dom';
import defaultImage from './defaultImage.jpg';
import AuthorCard from '../../components/Guest/AuthorCard';
import AuthorBooks from '../Guest/AuthorBooks';
import { toast } from 'react-toastify';

const AuthorPage = props => {
  const [author, setAuthor] = useState([]);
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get('/authors/' + props.match.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(result => {
        setAuthor(author.concat(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const [bookStatus, setBookStatus] = useState({ code: -1, status: 'Shelve' });

  const notify = () => toast(book.name + ' Book Status Changed To : ' + bookStatus.status);
  
  useEffect(() => {
    if (bookStatus.code !== -1) {
      axios
      .patch('books/' + book._id + '/change-status', {
        status: bookStatus.code,
      })
      .then(result => {
        notify();
      });
    }
  }, [bookStatus]);

  return (
    <>
      <section className='section details'>
        <div className='details__bg' data-bg='img/home/home__bg.jpg'></div>

        <div className='container'>
          <div className='row'>
            {author.map(item => (
              <AuthorCard author={item} key={item._id} />
            ))}
          </div>
        </div>
      </section>

      <section className='content'>
        <div className='content__head'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h2 className='content__title'>Books</h2>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='catalog'>
            <div className='container'>
              {author.map(book => (
                <div className='row'>
                  {book.books.map(item => (
                    <AuthorBooks book={item} setBook={setBook} bookStatus={bookStatus} setBookStatus={setBookStatus} key={item._id} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default requireAuth(AuthorPage);
