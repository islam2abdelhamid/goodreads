import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import AdminContext from '../../context/AdminContext/AdminContext'

const BookForm = (props) => {
  const context = useContext(AdminContext);

  useEffect(() => {
    context.retrieveAuthors();
    context.retrieveCategories();
    }, [])


  const handlingChange = (e)=>{
    const value = e.target.value
    const key = e.target.name
    context.setBookObject(b => ({...b, [key]: value}))
  }

  const handlingCoverChange = (e)=>{
    const image = e.target.files[0]
    context.setBookObject(prevBook => ({...prevBook, cover: image}))
  }

  return (
    <React.Fragment>
      <div className='form-group'>
        <input 
          type='text'
          className="form-control" 
          name='name'
          onChange={handlingChange}
          value={context.bookObject.name} 
          placeholder='Enter the book name...' 
          required
        />
      </div>
      <div className='form-group'>
        <select 
          className="custom-select drop-down-menu"
          onChange={handlingChange}
          value={context.bookObject.author}
          name='author' 
          required
        >
          <option value='-1' disabled>select Author</option>
          {context.authors.map((author)=>
            (<option key={author._id} value={author._id}>{`${author.firstName} ${author.lastName}`}</option>)
          )}
        </select>
      </div>
      <div className='form-group'>
        <select 
          className="custom-select drop-down-menu"
          onChange={handlingChange} 
          value={context.bookObject.category} 
          name='category' 
          required
        >
          <option value='-1' disabled>select Category</option>
          {context.categories.map((cat)=>
            (<option key={cat._id} value={cat._id}>{cat.name}</option>)
          )}
        </select>
      </div>
      <div className='form-group'>
        <label className="text-light">Cover</label>
        <input 
          type='file'
          className="form-control"
          onChange={handlingCoverChange}
          name='cover'
        />
      </div>
    </React.Fragment>
  );
};

export default BookForm;