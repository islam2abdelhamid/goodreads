import React from 'react';
import requireAuth from '../../hocs/requireAuth';
import axios from '../../axios/logged';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

const DataList = (props) => {

    const myStyle = {
        padding: "0px",
    }
    const books = props.books;


    const handleChangeListing = (e) => {
        // console.log(e.target.value + " hihihi " + e.target.id)
        window.location.replace(`http://localhost:5001/${e.target.value}`);
    }



    return (
        <div className='sign section--bg' data-bg='img/section/section.jpg' style={myStyle}>

            <section
                className='section section--first section--bg'
                data-bg='img/section/section.jpg'
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='section__wrap'>
                                <h2 className='section__title'>
                                    Welcome Back{' '}
                                    <strong>
                                        {props.user.firstName} {props.user.lastName}
                                    </strong>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='filter'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='filter__content'>
                                <div className='filter__items'>
                                    <div className='filter__item' id='filter__genre'>
                                        <span className='filter__item-label'>Books To View:</span>

                                        <div
                                            className='filter__item-btn dropdown-toggle'
                                            role='navigation'
                                            id='filter-genre'
                                            data-toggle='dropdown'
                                            aria-haspopup='true'
                                            aria-expanded='false'
                                        >

                                            <span></span>
                                        </div>



                                        <select class="form-control" onChange={handleChangeListing} id="listing">
                                            <option value="home">ALL</option>
                                            <option value="reading-books">Currently Reading</option>
                                            <option value="read-books">Read</option>
                                            <option value="want-to-read">Want To Read</option>

                                        </select>



                                    </div>
                                </div>

                                <button className='filter__btn' type='button'>
                                    apply filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-bordered justify-content-center text-center ">
                <thead>
                    <tr className="thead-dark">
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Auther</th>
                        <th>Avg Rate</th>

                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td className='align-middle text-light'>
                                <img
                                    class='img-thumbnail rounded table__img'
                                    src={(book.cover && 'http://localhost:5000' + book.cover)} />
                            </td>
                            <td className='align-middle editable text-light'>
                                <Link to={'/books/' + book._id}>
                                    {book.name}
                                </Link>
                            </td>
                            <td className='align-middle text-light'>
                                <Link to={'/authors/' + book.author._id}>
                                    {book.author.firstName} {book.author.lastName}
                                </Link>
                            </td>
                            <td className='align-middle text-light' >
                                <span className='card__rate'>
                                    <i className='icon ion-ios-star'></i> {book.rate || '0'}
                                </span>
                            </td>


                        </tr>
                    )
                    )}
                </tbody>

            </table>


        </div>
    );
};

export default DataList;
