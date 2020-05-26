
import React from 'react';
const AuthorBooks = (props)=>{
    return (
<div className="col-6 col-sm-12 col-lg-6">
<div className="card card--list">
  <div className="row">
    <div className="col-12 col-sm-4">
      <div className="card__cover">
        <img style={{width:200 , height:200 }} src= {(props.book.cover && 'http://localhost:5000' + props.book.cover)} alt="" />
        <a href="#" className="card__play">
          <i className="icon ion-ios-eye"></i>
        </a>
      </div>
    </div>
  

<div className="col-12 col-sm-8">
<div className="card__content">
<h3 className="card__title ml-5">
  <a href="#" >{props.book.name}</a>
</h3>


<div className="card__wrap">
  <span className="card__rate">
    <i className="icon ion-ios-star ml-5"></i>{(props.book.rate) || 0}
  </span>
</div>


</div>
</div>
</div>
</div>
</div>
 )
}

export default AuthorBooks;