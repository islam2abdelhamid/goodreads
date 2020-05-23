import React, { useState, useEffect } from 'react';
import requireAuth from '../../hocs/requireAuth';
import loggedAxios from '../../axios/logged.js';

const Book = props => {
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
  console.log(props.match.params.id);
  return <h1>Single Book</h1>;
};
export default requireAuth(Book);
