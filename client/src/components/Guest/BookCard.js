import React from 'react';
import defaultImage from './defaultBook.jpg';
import { Link } from 'react-router-dom';
const BookCard = props => {
  return (
    <div className='item' key={props.book._id}>
      <div className='card card--big' style={{ backgroundColor: '#2b2b31' }}>
        <div className='card__cover'>
          <img
            style={{ width: '100%', height: 250 }}
            src={
              (props.book.cover &&
                'http://localhost:5000' + props.book.cover) ||
              defaultImage
            }
            alt=''
          />
          <Link to={'/books/' + props.book._id} className='card__play'>
            <i className='icon ion-ios-eye'></i>
          </Link>
        </div>

        <div className='card__content'>
          <h3 className='card__title'>
            <Link to={'/books/' + props.book._id}>{props.book.name}</Link>
          </h3>
          <span className='card__category'>
            {(props.book.category && (
              <Link to={'/categories/' + props.book.category.name}>
                {props.book.category.name}
              </Link>
            )) ||
              (props.book.author && (
                <Link to={'/authors/' + props.book.author._id}>
                  {props.book.author.firstName}
                </Link>
              ))}
          </span>
          <span className='card__rate'>
            <i className='icon ion-ios-star'></i> {props.book.rate || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
