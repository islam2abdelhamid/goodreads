import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'
import {Link} from "react-router-dom"
const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [authorsPerPage, setAuthorsPerPage] = useState(6);
    const [activeLinkIndex, setActiveLinkIndex] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(authors.length / authorsPerPage); i++) {
        pageNumbers.push(i);
    }
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
    
      const styles = {
        container: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap:true,
        },
        item: {
            margin: '10px',
            padding: '10px',
            width:'28%'
        },
        section: {
            backgroundImage: `url("assets/img/section/section.jpg")`,
        }
    };

    //get Current Authors
    const indexOfLastAuthor = authorsPerPage * currentPage;
    const indexOfFirstAuthor= indexOfLastAuthor - authorsPerPage;
    const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

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
        <section className="section section--first section--bg"  data-bg="assets/img/section/section.jpg">
            <div className="container" >
                <div className="row" >
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Authors </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog" style={{}}>
            <div className="container">
                <div className="row">
                    <div className="row" style={styles.container}>
                            {currentAuthors.map((author)=>(
                                <div style={styles.item}  key={author._id}>
                                        <div className="card__cover">
                                            <img style={{height:'500px'}} src={(author.avatar && 'http://localhost:5000' + author.avatar)} alt="No Avatar"/>
                                            <Link to={`/authors/${author._id}`} className="card__play">
                                                <i className="icon ion-ios-eye"></i>
                                            </Link>
                                        </div>
                                        <div style={{display: 'flex',justifyContent: 'center',}} className="card__content">
                                            <h1 style={{fontSize: '150%' }} className="card__title"><a  href="#">{author.firstName} {author.lastName}</a></h1>
                                        </div>
                                </div>
                            )
                        )}
                    </div>
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
export default requireAuth(Authors);