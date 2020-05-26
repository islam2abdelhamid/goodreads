import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin';
import Modal from './Modal';
import ModalContext from '../../context/AdminContext/AdminContext';
import defaultImage from './defaultImage.jpg';

const Authors = () => {
  const context = useContext(ModalContext);

  let index = 0;
  useEffect(() => {
    context.retrieveAuthors();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletingAuthor = e => {
    let id = e.target.dataset.id;
    axios
      .delete(`/authors/${id}`)
      .then(result => {
        context.retrieveAuthors();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const creation = () => {
    context.setAuthorObject({
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(),
    });
    context.setOperation('create');
  };

  const editing = author => {
    context.setAuthorObject(author);
    context.setOperation('edit');
  };

  return (
    <div className='col-10 m-auto'>
      <i
        className='fas fa-plus-circle mb-3'
        title={'create new author'}
        type='button'
        onClick={() => {
          creation();
          handleShow();
        }}
      ></i>
      <Modal
        type='author'
        creation={creation}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />

      <h2 className='pink-text'>Authors</h2>
      <table className='table table-bordered justify-content-center text-center '>
        <thead>
          <tr className='thead-dark'>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Image</th>
            <th>Date Of Birth</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {context.authors.map(author => (
            <tr key={author._id}>
              <td className='align-middle text-light'>{index++}</td>
              <td
                className='align-middle editable text-light'
                data-id={author._id}
              >
                {author.firstName}
              </td>
              <td
                className='align-middle editable text-light'
                data-id={author._id}
              >
                {author.lastName}
              </td>
              <td className='align-middle'>
                <img
                  className='img-thumbnail rounded table__img'
                  src={
                    (author.avatar &&
                      'http://localhost:5000' + author.avatar) ||
                    defaultImage
                  }
                  alt='author'
                />
              </td>
              <td className='align-middle text-light'>
                {new Date(`${author.dateOfBirth}`).toDateString().slice(3)}
              </td>
              <td className='align-middle text-light' data-id={author._id}>
                <i
                  className='fa fa-edit'
                  onClick={() => {
                    editing(author);
                    handleShow();
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
                  data-id={author._id}
                  onClick={deletingAuthor}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default requireAdmin(Authors);
