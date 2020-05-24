import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin'
import Modal from './Modal';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/authors')
          .then((result) => {
            setAuthors(authors.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])


    const deletingAuthor = (e)=>{
      let id = e.target.dataset.id
      axios
      .delete(`/authors/${id}`)
      .then((result) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
      <div className="col-10 m-auto">
        <Modal type='author' />
        <h2 className="pink-text">Authors</h2>
        <i className="fas fa-plus-circle mb-3" title='Create new Author' type="button" data-toggle="modal" data-target="#exampleModalCenter"></i>
        <table className="table table-bordered justify-content-center text-center ">
            <thead>
                  <tr className="thead-dark">
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Image</th>
                        <th>Date Of Birth</th>
                        <th colSpan="2">Actions</th>
                  </tr>
            </thead>
        <tbody>
        {authors.map((author)=>(
            <tr key={author._id}>
                <td className='align-middle text-light'>{index++}</td>
                <td className='align-middle editable text-light' data-id={ author._id }>{author.firstName}</td>
                <td className='align-middle editable text-light' data-id={ author._id }>{author.lastName}</td>
                <td className='align-middle'><img className='img-thumbnail rounded table__img' src="https://picsum.photos/200/300"/></td>
                <td className='align-middle text-light'>{new Date(`${author.dateOfBirth}`).toDateString().slice(3,)}</td>
                <td className='align-middle text-light'>
                  <i className="fa fa-trash" title='delete' data-id={ author._id } onClick={deletingAuthor}></i>
                </td>
            </tr>
            )
        )}
        </tbody>
    </table>
    </div>
  );
};
export default requireAdmin(Authors);