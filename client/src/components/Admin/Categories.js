import React, { useContext, useState, useEffect } from 'react';
import axios from '../../axios/logged';
import requireAdmin from '../../hocs/requireAdmin';
import Modal from './Modal';
import AdminContext from '../../context/AdminContext/AdminContext';

const Categories = () => {
  const context = useContext(AdminContext);

  let index = 0;

  useEffect(() => {
    context.retrieveCategories();
  }, []);

  const deletingCat = e => {
    let id = e.target.dataset.id;
    axios
      .delete(`/categories/${id}`)
      .then(result => {
        context.retrieveCategories();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const creation = () => {
    context.setCategoryObject({ name: '' });
    context.setOperation('create');
  };

  const editing = cat => {
    context.setCategoryObject(cat);
    context.setOperation('edit');
  };

  return (
    <div className='col-6 m-auto'>
      <i
        className='fas fa-plus-circle mb-3'
        title={'create new category'}
        type='button'
        onClick={() => {
          creation();
          context.handleShow();
        }}
      ></i>
      <Modal
        type='category'
        creation={creation}
        show={context.show}
        handleClose={context.handleClose}
        handleShow={context.handleShow}
      />

      <h2 className='pink-text'>Categories</h2>
      <table className='table table-bordered justify-content-center text-center '>
        <thead>
          <tr className='thead-dark'>
            <th>#</th>
            <th className='col-4'>Name</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {context.categories.map(cat => (
            <tr key={cat._id}>
              <td className='align-middle text-light'>{index++}</td>
              <td
                className='align-middle editable text-light'
                data-id={cat._id}
              >
                {cat.name}
              </td>
              <td className='align-middle text-light' data-id={cat._id}>
                <i
                  className='fa fa-edit'
                  data-toggle='modal'
                  data-target='#exampleModalCenter'
                  onClick={() => {
                    editing(cat);
                    context.handleShow();
                  }}
                  title='edit'
                ></i>
              </td>
              <td className='align-middle text-light'>
                <i
                  className='fa fa-trash'
                  title='delete'
                  data-id={cat._id}
                  onClick={deletingCat}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default requireAdmin(Categories);
