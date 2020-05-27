import React, { useState } from 'react';
import AdminContext from './AdminContext';
import axios from '../../axios/logged'

const AdminContextProvider = (props) => {
    const [categoryObject, setCategoryObject] = useState({name:''})
    const [bookObject, setBookObject] = useState({name:'', author:'-1', category:'-1'})
    const [authorObject, setAuthorObject] = useState({firstName:'', lastName:'', dateOfBirth: new Date()})
    const [operation, setOperation] = useState('')
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const retrieveBooks = ()=>{
        axios
        .get('/books')
        .then((result) => {
          setBooks(result.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const retrieveCategories = ()=>{
      axios
      .get('/categories')
      .then((result) => {
        setCategories(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    const retrieveAuthors = ()=>{
      axios
      .get('/authors')
      .then((result) => {
        setAuthors(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
        <AdminContext.Provider value=
          {{ 
            books, setBooks, authors, setAuthors, categories, setCategories, categoryObject,
            setCategoryObject, bookObject, setBookObject, operation, setOperation, retrieveBooks,
            retrieveAuthors, retrieveCategories, authorObject, setAuthorObject, handleClose, handleShow, show
          }}
        >
          {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
