import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage, setCategoriesPerPage] = useState(8);
    const [activeLinkIndex, setActiveLinkIndex] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
        pageNumbers.push(i);
    }

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
    
    //get Current Categories
    const indexOfLastCat = categoriesPerPage * currentPage;
    const indexOfFirstCat = indexOfLastCat - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCat, indexOfLastCat);

    //paginate
    const paginate = pageNo => setCurrentPage(pageNo);
    const paginatePrev = () => {
        if(currentPage != 1){
        setCurrentPage(currentPage - 1);
        setActiveLinkIndex(currentPage - 1);
        }
    }
    const paginateNext = () => {
        if(currentPage != pageNumbers.length){
        setCurrentPage(currentPage + 1);
        setActiveLinkIndex(currentPage + 1);
        }
    }

  return (
    <>
        <section className="section section--first section--bg" style={{ backgroundImage:`url(assets/img/section/section.jpg)` }} data-bg="assets/img/section/section.jpg">
            <div className="container" >
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Categories </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="categories">
            <div className="container">
                <div className="row">
                    {currentCategories.map((cat)=>(
                        <div className="col-md-3" key={cat._id}>
                            <div className="category__card">
                                <h2><a  href={'/categories/' + cat._id}>{cat.name}</a></h2>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
        </div>
        <div className='col-12'>
            <ul className='paginator paginator--list'>
            <li class="paginator__item paginator__item--prev">
            <a
                onClick={e => {
                e.preventDefault();
                paginatePrev();
            }}
                href="#"><i class="icon ion-ios-arrow-back"></i></a>
            </li>
            {pageNumbers.map(number => (
                <li
                key={number}
                className={
                    activeLinkIndex === number
                    ? 'paginator__item paginator__item--active'
                    : 'paginator__item'
                }
                >
                <a
                    onClick={e => {
                    e.preventDefault();
                    paginate(number);
                    setActiveLinkIndex(number);
                    }}
                    href='!#'
                >
                    {number}
                </a>
                </li>
            ))}
            <li class="paginator__item paginator__item--next">
                <a 
                onClick={e => {
                e.preventDefault();
                paginateNext();
                }}
                href="#"><i class="icon ion-ios-arrow-forward"></i></a>
            </li>
            </ul>
        </div>
    </>
  );
};
export default requireAuth(Categories);
