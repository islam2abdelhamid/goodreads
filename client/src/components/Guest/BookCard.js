import React from 'react';

const BookCard = (props)=>{
    return (
        <div className='item' key={props.book._id}>
            <div className='card card--big'style={{backgroundColor:"#2b2b31" }} >
                <div className='card__cover' >
                <img style={{width:250 , height:250}}src={(props.book.cover && 'http://localhost:5000' + props.book.cover)} alt='' />
                <a href='#' className='card__play'>
                    <i className='icon ion-ios-eye'></i>
                </a>
                </div>

                <div className='card__content'>
                <h3 className='card__title'  >
                    <a  href='#'>
                    {props.book.name}
                    </a>
                </h3>
                <span className='card__category'>
                    {(props.type === 'category' && props.book.category && (
                    <a href='#'>{props.book.category.name}</a>
                    )) || (props.book.author && (
                        <a href='#'>{props.book.author.firstName}</a>
                        ))}
                </span>
                <span className='card__rate'>
                    <i className='icon ion-ios-star'></i> {props.book.rate || 0} 
                </span>
                </div>
            </div>
        </div>
    )
}

export default BookCard;