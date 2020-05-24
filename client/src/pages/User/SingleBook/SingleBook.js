import React, { useState, useEffect } from 'react';
import requireAuth from '../../../hocs/requireAuth';
import loggedAxios from '../../../axios/logged';
import { Book } from './Book';
import { Reviews } from './Reviews';

const SingleBook = props => {
  const [book, setBook] = useState(null);
  useEffect(() => {
    loggedAxios
      .get('/books/' + props.match.params.id)
      .then(result => {
        setBook(result.data);
      })
      .catch(err => {
        props.history.push('/404');
      });
  }, []);

  return (
    book && (
      <>
        {' '}
        <Book book={book} />
        <Reviews />
      </>
    )
  );
};
export default requireAuth(SingleBook);
