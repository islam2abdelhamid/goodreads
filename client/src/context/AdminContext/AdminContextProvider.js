import React, { createContext, useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import axios from '../../axios/logged'

const AdminContextProvider = (props) => {
    const [categoryObject, setCategoryObject] = useState({})
    const [bookObject, setBookObject] = useState({})
    const [authorObject, setAuthorObject] = useState({})
    const [operation, setOperation] = useState('')
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);

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
            retrieveAuthors, retrieveCategories, authorObject, setAuthorObject
          }}
        >
          {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;