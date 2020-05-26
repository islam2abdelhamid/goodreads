import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get('/categories')
      .then(result => {
        setCategories(categories.concat(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section
        className='section section--first section--bg'
        style={{ backgroundImage: `url(assets/img/section/section.jpg)` }}
        data-bg='assets/img/section/section.jpg'
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div className='section__wrap'>
                <h2 className='section__title'>Categories </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id='categories'>
        <div className='container'>
          <div className='row'>
            {categories.map(cat => (
              <div className='col-md-3' key={cat._id}>
                <div className='category__card'>
                  <h2>
                    <Link to={'/categories/' + cat._id}>{cat.name}</Link>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default requireAuth(Categories);
