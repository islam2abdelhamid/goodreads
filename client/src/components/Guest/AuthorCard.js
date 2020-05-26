import React from 'react';
import defaultImage from './defaultBook.jpg';

const AuthorCard = props => {
  return (
    <div className='col-12' key={props.author._id}>
      <h1 className='details__title'>
        {props.author.firstName + ' ' + props.author.lastName}
      </h1>

      <div className='col-12 col-xl-6'>
        <div className='card card--details'>
          <div className='row'>
            <div className='col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5'>
              <div className='card__cover'>
                <img
                  style={{ width: 400, height: 400 }}
                  src={
                    (props.author.avatar &&
                      'http://localhost:5000' + props.author.avatar) ||
                    defaultImage
                  }
                  alt=''
                />
              </div>
            </div>

            <div className='col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7'>
              <div className='card__content'>
                <div className='card__wrap'>
                  <span className='card__rate'>
                    <i className='icon ion-ios-calendar ml-5'></i>
                    {new Date(`${props.author.dateOfBirth}`)
                      .toDateString()
                      .slice(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
