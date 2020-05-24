import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin'
import Modal from './Modal';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/categories')
          .then((result) => {
            setCategories(categories.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

    const deletingCat = (e)=>{
      let id = e.target.dataset.id
      axios
      .delete(`/categories/${id}`)
      .then((result) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }


    return (
      <div className="col-6 m-auto">
        <Modal type='category' />
        <h2 className="pink-text">Categories</h2>
        <i className="fas fa-plus-circle mb-3" title='Create new category' type="button" data-toggle="modal" data-target="#exampleModalCenter"></i>
        <table className="table table-bordered justify-content-center text-center ">
        <thead>
        <tr className="thead-dark">
            <th>#</th>
            <th className="col-4">Name</th>
            <th colSpan="2">Actions</th>
        </tr>
        </thead>
        <tbody>
        {categories.map((cat)=>(
            <tr>
                <td className='align-middle text-light'>{index++}</td>
                <td className='align-middle editable text-light' data-id={ cat._id }>{cat.name}</td>
                <td className='align-middle text-light' data-id={ cat._id }><i className="fa fa-edit" title='edit'></i></td>
                <td className='align-middle text-light'>
                  <i className="fa fa-trash" title='delete' data-id={ cat._id } onClick={deletingCat}></i>
                </td>
            </tr>
            )
        )}
        </tbody>
    </table>
    </div>
  );
};
export default requireAdmin(Categories);