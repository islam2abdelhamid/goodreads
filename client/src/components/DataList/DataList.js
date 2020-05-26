import React, { useContext, useState, useEffect, useRef } from 'react';
import requireAuth from '../../hocs/requireAuth';
import axios from '../../axios/logged';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import defaultImage from './defaultImage.jpg';

const DataList = props => {
  const [books, setBooks] = useState([]);
  const [choice, setChoice] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then(result => {
        setBooks(result.data.books);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/' + choice)
      .then(result => {
        setBooks([]);
        setBooks(result.data.books);
      })
      .catch(err => {});
  }, [choice]);

  const myStyle = {
    padding: '0px',
  };
  const type = props.type;
  const handleChangeListing = e => {
    window.location.replace(`http://localhost:5001/${e.target.value}`);
  };
  const handleChangeStatus = async e => {
    const myValue = e.target.value;
    axios.patch(`http://localhost:5000/books/${e.target.id}/change-status `, {
      status: myValue,
    });
  };

  return (
    <div
      className='sign section--bg'
      data-bg='img/section/section.jpg'
      style={myStyle}
    >
      <section
        className='section section--first section--bg'
        data-bg='img/section/section.jpg'
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='section__wrap'>
                <h2 className='section__title'>
                  Welcome Back{' '}
                  <strong>
                    {props.user.firstName} {props.user.lastName}
                  </strong>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='filter'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='filter__content'>
                <div className='filter__items'>
                  <div className='filter__item' id='filter__genre'>
                    <span className='filter__item-label'>Books To View:</span>

                    <select
                      className='form-control'
                      onChange={e => {
                        setChoice(e.target.value);
                      }}
                      id='listing'
                    >
                      <option value=''>ALL</option>
                      <option value='Currently'>Currently Reading</option>
                      <option value='Read'>Read</option>
                      <option value='Want'>Want To Read</option>
                    </select>
                  </div>
                </div>

                <button className='filter__btn' type='button'>
                  apply filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className='table table-bordered justify-content-center text-center '>
        <thead>
          <tr className='thead-dark'>
            <th>Cover</th>
            <th>Name</th>
            <th>Auther</th>
            <th>Avg Rate</th>
            <th>Rating</th>
            <th colSpan='2'>Shelve</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.book._id}>
              <td className='align-middle text-light'>
                <img
                  className='img-thumbnail rounded table__img'
                  src={
                    (book.book.cover &&
                      'http://localhost:5000' + book.book.cover) ||
                    defaultImage
                  }
                  alt='book cover'
                />
              </td>
              <td className='align-middle editable text-light'>
                <Link to={'/books/' + book.book._id}>{book.book.name}</Link>
              </td>
              <td className='align-middle text-light'>
                <Link to={'/authors/' + book.book.author._id}>
                  {book.book.author.firstName} {book.book.author.lastName}
                </Link>
              </td>
              <td className='align-middle text-light'>
                <span className='card__rate'>
                  <i className='icon ion-ios-star'></i> {book.book.rate || '0'}
                </span>
              </td>

              <td className='align-middle text-light'>
                {/* {book.rate ? book.book.rate : 0} */}
                {/* {book.status} */}

                <span className='card__rate'>
                  <i className='icon ion-ios-star'></i> {book.rate || '0'}
                </span>
              </td>

              <td className='align-middle text-light'>
                <select
                  className='form-control'
                  onChange={handleChangeStatus}
                  id={book.book._id}
                >
                  <optgroup label='Select Status'>
                    <option></option>
                    <option value='0'>Currently Reading</option>
                    <option value='1'>Read</option>
                    <option value='2'>Want To Read</option>
                  </optgroup>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
