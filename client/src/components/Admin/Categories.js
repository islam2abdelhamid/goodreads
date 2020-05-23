import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios';
import requireAdmin from '../../hocs/requireAdmin'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
    useEffect(() => {
        axios
          .get('/categories', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setCategories(categories.concat(result.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }, [])

    return (
      <div className="col-6 m-auto">
        <h2 className="pink-text">Categories</h2>
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
                <td className='align-middle editable text-light' data-id={ cat.id }>{cat.name}</td>
                <td className='align-middle text-light' data-id={ cat.id }><i className="fa fa-edit"></i></td>
                <td className='align-middle text-light' data-id={ cat.id }><i className="fa fa-trash"></i></td>
            </tr>
            )
        )}
        </tbody>
        {/* <tr>
            <form method="POST" action="{% url 'create_question' %}">
                <td className='align-middle'>
                    <input type="text" name="question" className="form-control" placeholder="Enter your question...">
                </td>
                <td className='align-middle'>
                    <input type="text" name="answer" className="form-control col-8" style="display: inline-block" placeholder="Enter your answer...">
                    <input type="hidden" name="order" value="{{ order }}">
                    <button className="btn btn-primary ml-2 align-middle" style="display: inline-block; margin-top: -.3rem;">Submit</button>
                </td>
            </form>
        </tr> */}
    </table>
    </div>
  );
};
export default requireAdmin(Categories);