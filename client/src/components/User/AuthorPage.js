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
   
      <section class="section details">
        <div class="details__bg" data-bg="img/home/home__bg.jpg"></div>

        <div class="container">
        
          <div class="row">
              {author.map((item)=> 

            <div class="col-12">
              <h1 class="details__title">{item.firstName +" " + item.lastName}</h1>


            <div class="col-12 col-xl-6">
              <div class="card card--details">
                <div class="row">
                  <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                    <div class="card__cover">
                      <img src='assets/img/section/section.jpg' alt="ssn" />
                  </div>
                    </div>

                  <div class="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                    <div class="card__content">
                      <div class="card__wrap">
                        <span class="card__rate">
                          <i class="icon ion-ios-calendar"></i>{item.dateOfBirth.split('T')[0]}
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
     

      <section class="content">
        <div class="content__head">
          <div class="container">
         
            <div class="row">
             
              <div class="col-12">
                <h2 class="content__title">Books</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="catalog">
            <div class="container">
            {author.map((book)=>
              <div class="row">
                  {book.books.map((item)=>
                <div class="col-6 col-sm-12 col-lg-6">
                  <div class="card card--list">
                    <div class="row">
                      <div class="col-12 col-sm-4">
                        <div class="card__cover">
                          <img src="img/covers/cover.jpg" alt="" />
                          <a href="#" class="card__play">
                            <i class="icon ion-ios-eye"></i>
                          </a>
                        </div>
                      </div>
                    

              <div class="col-12 col-sm-8">
                <div class="card__content">
                  <h3 class="card__title">
                    <a href="#">{item.name}</a>
                  </h3>
                  

                  <div class="card__wrap">
                    <span class="card__rate">
                      <i class="icon ion-ios-star"></i>{item.rate}
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
