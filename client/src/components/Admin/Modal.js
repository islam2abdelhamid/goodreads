import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import CategoryForm from './CateogryForm';
import AdminContext from '../../context/AdminContext/AdminContext'

const Modal = (props) => {
  const context = useContext(AdminContext)

const handlingFormSubmit = (e)=>{
  e.preventDefault();
  (context.operation == 'create')? handlingCreation(e): handlingEditing(e);
}

  const handlingCreation = (event)=>{
      (props.type === 'book')? handlingBookCreation(event.target):
          (props.type === 'author')? handlingAuthorCreation(event.target):
              handlingCategoryCreation(event.target)
  }

  const handlingEditing = (event)=>{
      (props.type === 'book')? handlingBookEditing():
        (props.type === 'author')? handlingAuthorEditing():
          handlingCategoryEditing();
  }

  const handlingBookCreation = (form)=>{
      let name = form.name.value;
      let author = form.author.value;
      let category = form.category.value;
      if (category == -1 || author == -1){
          console.log('hi there');
          
          alert('you must choose author and cateogry for the book!')
          return
      }
      axios
      .post('/books', {name, category, author},
      )
      .then((result) => {
        context.retrieveBooks();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handlingCategoryCreation = (form)=>{
      let name = form.name.value;
      axios
      .post('/categories', {name},
      )
      .then((result) => {
        context.retrieveCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handlingAuthorCreation = (form)=>{
      let firstName = form.firstName.value;
      let lastName = form.lastName.value;
      let dateOfBirth = form.dateOfBirth.value;

      axios
      .post('/authors', {firstName, lastName, dateOfBirth},
      )
      .then((result) => {
        context.retrieveAuthors();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handlingBookEditing = ()=>{
    let id = context.bookObject._id;
    let name = context.bookObject.name;
    let author = context.bookObject.author;
    let category = context.bookObject.category;
    axios
    .patch(`/books/${id}`, {name, author, category}
    )
    .then((result) => {
      context.retrieveBooks();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handlingAuthorEditing = ()=>{
    let id = context.authorObject._id;
    let firstName = context.authorObject.firstName;
    let lastName = context.authorObject.lastName;
    let dateOfBirth = context.authorObject.dateOfBirth;

    axios
    .patch(`/authors/${id}`, {firstName, lastName, dateOfBirth}
    )
    .then((result) => {
      context.retrieveAuthors();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handlingCategoryEditing = (e)=>{
      let id = context.categoryObject._id;
      let name = context.categoryObject.name;
      axios
      .patch(`/categories/${id}`, {name}
      )
      .then((result) => {
        context.retrieveCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
  <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content bg-dark">
          <div className="modal-header">
          <h5 className="modal-title pink-text" id="exampleModalLongTitle">{(context.operation == 'edit' && 'Edit' ) || ('Create') } {props.type}</h5>
          <button type="button" className="close pink-text" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div className="modal-body">
              <form onSubmit={handlingFormSubmit} id='admin-form'>
                  {(props.type === 'book' && <BookForm />) || (props.type === 'author' && <AuthorForm />) || (props.type === 'category' && <CategoryForm />)}
                  <div className="modal-footer">
                  <button type="button" className="btn btn-primary bg-dark border-0" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn pink-text pink-button">{(context.operation == 'edit' && 'Edit' ) || ('Create') }</button>
                  </div>
              </form>
          </div>
      </div>
      </div>
  </div>
  );
};

export default Modal;