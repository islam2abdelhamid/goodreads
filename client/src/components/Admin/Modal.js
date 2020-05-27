import React, { useContext, useState, useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

import axios from '../../axios/logged';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import CategoryForm from './CateogryForm';
import AdminContext from '../../context/AdminContext/AdminContext';

const Modal = props => {
  const context = useContext(AdminContext);

  const handlingFormSubmit = e => {
    e.preventDefault();
    props.handleClose();
    context.operation === 'create' ? handlingCreation(e) : handlingEditing(e);
  };

  const handlingCreation = event => {
    props.type === 'book'
      ? handlingBookCreation(event.target)
      : props.type === 'author'
      ? handlingAuthorCreation(event.target)
      : handlingCategoryCreation(event.target);
  };

  const handlingEditing = event => {
    props.type === 'book'
      ? handlingBookEditing()
      : props.type === 'author'
      ? handlingAuthorEditing()
      : handlingCategoryEditing();
  };

  const handlingBookCreation = form => {
    const name = form.name.value;
    const author = form.author.value;
    const category = form.category.value;
    const cover = form.cover.files[0];

    if (category == -1 || author == -1) {
      console.log('hi there');

      alert('you must choose author and cateogry for the book!');
      return;
    }
    axios
      .post('/books', { name, category, author })
      .then(result => {
        context.retrieveBooks();
        updatingBookCover(result.data._id, cover);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlingCategoryCreation = form => {
    const name = form.name.value;
    axios
      .post('/categories', { name })
      .then(result => {
        context.retrieveCategories();
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlingAuthorCreation = form => {
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const dateOfBirth = form.dateOfBirth.value;
    const avatar = form.avatar.files[0];

    axios
      .post('/authors', { firstName, lastName, dateOfBirth })
      .then(result => {
        context.retrieveAuthors();
        updatingAuthorAvatar(result.data._id, avatar);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlingBookEditing = () => {
    const id = context.bookObject._id;
    const name = context.bookObject.name;
    const author = context.bookObject.author;
    const category = context.bookObject.category;
    axios
      .patch(`/books/${id}`, { name, author, category })
      .then(result => {
        context.retrieveBooks();
        if (context.bookObject.cover) {
          updatingBookCover(id, context.bookObject.cover);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlingAuthorEditing = () => {
    const id = context.authorObject._id;
    const firstName = context.authorObject.firstName;
    const lastName = context.authorObject.lastName;
    const dateOfBirth = context.authorObject.dateOfBirth;

    axios
      .patch(`/authors/${id}`, { firstName, lastName, dateOfBirth })
      .then(result => {
        context.retrieveAuthors();
        if (context.authorObject.avatar) {
          updatingAuthorAvatar(id, context.authorObject.avatar);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handlingCategoryEditing = e => {
    const id = context.categoryObject._id;
    const name = context.categoryObject.name;
    axios
      .patch(`/categories/${id}`, { name })
      .then(result => {
        context.retrieveCategories();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updatingBookCover = (bookId, cover) => {
    const formData = new FormData();
    formData.append('cover', cover);
    axios
      .patch(`/books/${bookId}/update-cover`, formData, {
        'content-type': 'multipart/form-data',
      })
      .then(() => context.retrieveBooks());
  };

  const updatingAuthorAvatar = (authorId, avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    axios
      .patch(`/authors/${authorId}/update-avatar`, formData, {
        'content-type': 'multipart/form-data',
      })
      .then(() => context.retrieveAuthors());
  };

  return (
    <>
      <BootstrapModal show={props.show} onHide={props.handleClose} centered={true}>
        <BootstrapModal.Header closeButton >
          <BootstrapModal.Title className='pink-text'>
            {' '}
            {(context.operation == 'edit' && 'Edit') || 'Create'} {props.type}
          </BootstrapModal.Title>
        </BootstrapModal.Header>

        <BootstrapModal.Body>
          <form
            onSubmit={handlingFormSubmit}
            id='admin-form'
            encType='multipart/form-data'
          >
            {(props.type === 'book' && <BookForm />) ||
              (props.type === 'author' && <AuthorForm />) ||
              (props.type === 'category' && <CategoryForm />)}

            <BootstrapModal.Footer>
              <button
                type='button'
                className='btn btn-primary bg-dark border-0'
                data-dismiss='modal'
                onClick={props.handleClose}
              >
                Cancel
              </button>
              <button type='submit' className='btn pink-text pink-button'>
                {(context.operation == 'edit' && 'Edit') || 'Create'}
              </button>
            </BootstrapModal.Footer>
          </form>{' '}
        </BootstrapModal.Body>
      </BootstrapModal>
    </>
  );
};

export default Modal;
