import React, { useState, useEffect } from "react";

import requireAuth from "../../hocs/requireAuth";
import axios from "../../axios/logged";
import { useParams } from "react-router-dom";

const AuthorPage = (props) => {
  const [author, setAuthor] = useState([]);
  const [booksList, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })

      .then((res) => {
        setBooks(booksList.concat(res.data));
        console.log(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/authors/" + props.match.params.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((result) => {
        setAuthor(author.concat(result.data));
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
   
      <section className="section details">
        <div className="details__bg" data-bg="img/home/home__bg.jpg"></div>

        <div className="container">
        
          <div className="row">
              {author.map((item)=> 

            <div className="col-12">
              <h1 className="details__title">{item.firstName +" " + item.lastName}</h1>


            <div className="col-12 col-xl-6">
              <div className="card card--details">
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                    <div className="card__cover">
                      <img style={{width:400 , height: 400}} src= {(item.avatar && 'http://localhost:5000' + item.avatar)} alt=""/>
                     
                  </div>
                    </div>

                  <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                    <div className="card__content">
                      <div className="card__wrap">
                        <span className="card__rate">
                          <i className="icon ion-ios-calendar ml-5"></i>{new Date(`${item.dateOfBirth}`).toDateString().slice(3,)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            )}
          </div>

        </div>
     

      <section className="content">
        <div className="content__head">
          <div className="container">
         
            <div className="row">
             
              <div className="col-12">
                <h2 className="content__title">Books</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="catalog">
            <div className="container">
            {author.map((book)=>
              <div className="row">
                  {book.books.map((item)=>
                <div className="col-6 col-sm-12 col-lg-6">
                  <div className="card card--list">
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="card__cover">
                          <img style={{width:200 , height:200 }} src= {(item.cover && 'http://localhost:5000' + item.cover)} alt="" />
                          <a href="#" className="card__play">
                            <i className="icon ion-ios-eye"></i>
                          </a>
                        </div>
                      </div>
                    

              <div className="col-12 col-sm-8">
                <div className="card__content">
                  <h3 className="card__title ml-5">
                    <a href="#" >{item.name}</a>
                  </h3>
                  

                  <div className="card__wrap">
                    <span className="card__rate">
                      <i className="icon ion-ios-star ml-5"></i>{(item.rate) || 0}
                    </span>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
          </div>
          )}
                  </div>
                  )}
                </div>
           
              </div>
        </div>
      </section>
    
     </section>
  );
};

export default requireAuth(AuthorPage);
