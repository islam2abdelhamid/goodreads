import React from 'react';
import requireAuth from '../../hocs/requireAuth';
import axios from '../../axios';
import { Redirect } from "react-router-dom";

const DataList = (props) => {

    const myStyle = {
        padding: "0px",
    }
    const books = props.books;
    const type = props.type;

    // console.log(books);

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
                                            <input type='button' value={type} />
                                            <span></span>
                                        </div>



                                        <select class="form-control" onChange={handleChangeListing} id="listing">
                                            <option value="home">ALL</option>
                                            <option value="reading-books">Currently Reading</option>
                                            <option value="read-books">Read</option>
                                            <option value="want-to-read">Want To Read</option>
                                            {/* 
                                            <option value="1">Currently Reading</option>
                                            <option value="2">Read</option>
                                            <option value="3">Want To Read</option> */}
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
                        <th>Rating</th>
                        <th colSpan="2">Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td className='align-middle text-light'>
                                <img
                                    class='img-thumbnail rounded table__img'
                                    src="https://picsum.photos/200/300" />
                            </td>
                            <td className='align-middle editable text-light'>{book.book.name}</td>
                            <td className='align-middle text-light'>{book.book.author.firstName} {book.book.author.lastName}</td>
                            <td className='align-middle text-light' >
                                {book.avgRate ? book.book.avgRate : 0}
                            </td>

                            <td className='align-middle text-light' >
                                {book.rate ? book.book.rate : 0}
                            </td>

                            <td className='align-middle text-light' >
                                <div className='filter__items'>
                                    <div className='filter__item' id='filter__genre'>

                                        <div
                                            className='filter__item-btn dropdown-toggle'
                                            role='navigation'
                                            id='filter-genre'
                                            data-toggle='dropdown'
                                            aria-haspopup='true'
                                            aria-expanded='false'
                                        >
                                            <input type='button' value={book.status == 0 ? "Currently Reading" : book.status == 1 ? "Read" : "Want To Read"} />
                                            <span></span>
                                        </div>

                                        <ul
                                            className='filter__item-menu dropdown-menu scrollbar-dropdown'
                                            aria-labelledby='filter-genre'
                                        >
                                            <li>Read</li>
                                            <li>Currently Reading</li>
                                            <li>Want To Read</li>
                                        </ul>
                                    </div>
                                </div>



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
