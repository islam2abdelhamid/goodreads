import React, { useState, useEffect } from 'react';
import requireAuth from '../../../hocs/requireAuth';
import loggedAxios from '../../../axios/logged';
import { Book } from './Book';
import { Reviews } from './Reviews';

const SingleBook = props => {
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    loggedAxios
      .get('/books/' + props.match.params.id)
      .then(result => {
        setBook(result.data);
        return loggedAxios.get('/books/' + props.match.params.id + '/reviews');
      })
      .then(result => {
        setReviews(result.data);
      })
      .catch(err => {
        setReviews([]);
        console.log(err);
      });
  };
  return (
    book && (
      <>
        <Book book={book} />
        {reviews && (
          <Reviews reviews={reviews} book={book} getReviews={getReviews} />
        )}
      </>
    )
  );
};
export default requireAuth(SingleBook);
