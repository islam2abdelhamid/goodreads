import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin'
import Modal from './Modal';

const Books = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/books')
          .then((result) => {
            setBooks(books.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])


    const deletingBook = (e)=>{
      let id = e.target.dataset.id
      axios
      .delete(`/books/${id}`)
      .then((result) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
      <div className="col-10 m-auto">
        <Modal type='book' />

        <h2 className="pink-text">Books</h2>
        <i className="fas fa-plus-circle mb-3" title='Create new Book' type="button" data-toggle="modal" data-target="#exampleModalCenter"></i>
        <table className="table table-bordered justify-content-center text-center ">
            <thead>
                  <tr className="thead-dark">
                        <th>#</th>
                        <th>Name</th>
                        <th>Cover</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th colSpan="2">Actions</th>
                  </tr>
            </thead>
        <tbody>
        {books.map((book)=>(
            <tr key={book._id}>
                <td className='align-middle text-light'>{index++}</td>
                <td className='align-middle editable text-light' data-id={ book._id }>{book.name}</td>
                <td className='align-middle text-light'>
                  <img 
                        className='img-thumbnail rounded table__img' 
                        src="https://picsum.photos/200/300"/>
                  </td>
                <td className='align-middle text-light'>{book.category.name}</td>
                <td className='align-middle text-light'>{`${book.author.firstName} ${book.author.lastName}`}</td>
                <td className='align-middle text-light' data-id={ book._id }><i className="fa fa-edit" title='edit'></i></td>
                <td className='align-middle text-light'>
                  <i className="fa fa-trash" title='delete' data-id={ book._id } onClick={deletingBook}></i>
                </td>
            </tr>
            )
        )}
        </tbody>
    </table>
    </div>
  );
};
export default requireAdmin(Books);