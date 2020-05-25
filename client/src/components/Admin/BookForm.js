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
      let value = e.target.value
      let key = e.target.name
      context.setBookObject(b => ({...b, [key]: value}))
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
                  defaultValue='-1' 
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
                  defaultValue='-1' 
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
        </React.Fragment>
    );
};

export default BookForm;