import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';
import requireAdmin from '../../hocs/requireAdmin'

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/authors', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setAuthors(authors.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

    return (
      <div className="col-8 m-auto">
        <h2 className="pink-text">Authors</h2>
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
                <td className='align-middle editable text-light' data-id={ author.id }>{author.firstName}</td>
                <td className='align-middle editable text-light' data-id={ author.id }>{author.lastName}</td>
                <td className='align-middle'><img class='img-thumbnail rounded table__img' src="https://picsum.photos/200/300"/></td>
                <td className='align-middle text-light'>{new Date(`${author.dateOfBirth}`).toDateString().slice(3,)}</td>
                <td className='align-middle text-light' data-id={ author.id }><i className="fa fa-edit"></i></td>
                <td className='align-middle text-light' data-id={ author.id }><i className="fa fa-trash"></i></td>
            </tr>
            )
        )}
        </tbody>
    </table>
    </div>
  );
};
export default requireAdmin(Authors);