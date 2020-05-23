import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';
import requireAdmin from '../../hocs/requireAdmin'

const Books = () => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/books', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setBooks(books.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

    return (
      <div className="col-8 m-auto">
        <h2 className="pink-text">Books</h2>
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
                <td className='align-middle editable text-light' data-id={ book.id }>{book.name}</td>
                <td className='align-middle text-light'>
                  <img 
                        class='img-thumbnail rounded table__img' 
                        src="https://picsum.photos/200/300"/>
                  </td>
                <td className='align-middle text-light'>{book.category.name}</td>
                <td className='align-middle text-light'>{book.author.firstName}</td>
                <td className='align-middle text-light' data-id={ book.id }><i className="fa fa-edit"></i></td>
                <td className='align-middle text-light' data-id={ book.id }><i className="fa fa-trash"></i></td>
            </tr>
            )
        )}
        </tbody>
    </table>
    </div>
  );
};
export default requireAdmin(Books);