import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';

const BookForm = (props) => {
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
          .get('/categories', {
          })
          .then((result) => {
            setCategories(categories.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .get('/authors', {
          })
          .then((result) => {
            setAuthors(authors.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

    return (
        <React.Fragment>
            <div className='form-group'>
                <input type='text' className="form-control" name='name' placeholder='Enter the book name...' required/>
            </div>
            <div className='form-group'>
                <select className="custom-select drop-down-menu" defaultValue='-1' name='author' required>
                    <option value='-1' disabled>select Author</option>
                    {authors.map((author)=>(<option key={author._id} value={author._id}>{`${author.firstName} ${author.lastName}`}</option>))}
                </select>
            </div>
            <div className='form-group'>
                <select className="custom-select drop-down-menu" defaultValue='-1' name='category' required>
                    <option value='-1' disabled>select Category</option>
                    {categories.map((cat)=>(<option key={cat._id} value={cat._id}>{cat.name}</option>))}
                </select>
            </div>
        </React.Fragment>
    );
};

export default BookForm;