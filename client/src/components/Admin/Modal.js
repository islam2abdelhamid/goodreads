import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import CategoryForm from './CateogryForm';

const Modal = (props) => {

    const handlingCreation = (e)=>{
        e.preventDefault();
        (props.type === 'book')? handlingBookCreation(e.target):
            (props.type === 'author')? handlingAuthorCreation(e.target):
                handlingCategoryCreation(e.target)
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
          window.location.reload(false);
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
          window.location.reload(false);
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
          window.location.reload(false);
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
            <h5 className="modal-title pink-text" id="exampleModalLongTitle">Create {props.type}</h5>
            <button type="button" className="close pink-text" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="modal-body">
                <form onSubmit={handlingCreation}>
                    {(props.type === 'book' && <BookForm />) || (props.type === 'author' && <AuthorForm />) || (props.type === 'category' && <CategoryForm />)}
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary bg-dark border-0" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn pink-text pink-button">Create</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Modal;