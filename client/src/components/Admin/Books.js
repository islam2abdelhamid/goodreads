import React, { useContext, useEffect } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin';
import Modal from './Modal';
import AdminContext from '../../context/AdminContext/AdminContext';
import defaultImage from './defaultImage.jpg';

const Books = () => {
  const context = useContext(AdminContext);

  let index = 0;
  useEffect(() => {
    context.retrieveBooks();
  },[]);

  const deletingBook = e => {
    let id = e.target.dataset.id;
    axios
      .delete(`/books/${id}`)
      .then(result => {
        context.retrieveBooks();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const creation = () => {
    context.setBookObject({ name: '', author: '-1', category: '-1' });
    context.setOperation('create');
  };

  const editing = book => {
    context.setBookObject({
      _id: book._id,
      name: book.name,
      author: (book.author && book.author._id) || -1,
      category: (book.category && book.category._id) || -1,
    });
    context.setOperation('edit');
  };

  return (
    <div className='col-10 m-auto'>
      <i
        className='fas fa-plus-circle mb-3'
        title={'create new book'}
        type='button'
        onClick={() => {
          creation();
          context.handleShow();
        }}
      ></i>
      <Modal
        type='book'
        creation={creation}
        show={context.show}
        handleClose={context.handleClose}
        handleShow={context.handleShow}
      />

      <h2 className='pink-text'>Books</h2>
      <table className='table table-bordered justify-content-center text-center '>
        <thead>
          <tr className='thead-dark'>
            <th>#</th>
            <th>Name</th>
            <th>Cover</th>
            <th>Category</th>
            <th>Author</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {context.books.map(book => (
            <tr key={book._id}>
              <td className='align-middle text-light'>{index++}</td>
              <td
                className='align-middle editable text-light'
                data-id={book._id}
              >
                {book.name}
              </td>
              <td className='align-middle text-light'>
                <img
                  className='img-thumbnail rounded table__img'
                  src={
                    (book.cover && 'http://localhost:5000' + book.cover) ||
                    defaultImage
                  }
                  alt='book'
                />
              </td>
              <td className='align-middle text-light'>
                {(book.category && book.category.name) || <p style={{color: 'red'}}>UnCategorized</p>}
              </td>
              <td className='align-middle text-light'>{(book.author && `${book.author.firstName} ${book.author.lastName}`) || <p style={{color: 'red'}}>Author is not available</p>}</td>
              <td className='align-middle text-light' data-id={book._id}>
                <i
                  className='fa fa-edit'
                  onClick={() => {
                    editing(book);
                    context.handleShow();
                  }}
                  title='edit'
                  data-toggle='modal'
                  data-target='#exampleModalCenter'
                ></i>
              </td>
              <td className='align-middle text-light'>
                <i
                  className='fa fa-trash'
                  title='delete'
                  data-id={book._id}
                  onClick={deletingBook}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default requireAdmin(Books);
