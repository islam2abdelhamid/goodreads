import React, { useState, useEffect } from "react";

import requireAuth from "../../hocs/requireAuth";
import axios from "../../axios/logged";
import { useParams } from "react-router-dom";
import AuthorCard from '../../components/Guest/AuthorCard';
import AuthorBooks from "../Guest/AuthorBooks";

const AuthorPage = (props) => {
  const [author, setAuthor] = useState([]);
  const [booksList, setBooks] = useState([]);


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
              <AuthorCard author={item} key={item._id} />

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
               <AuthorBooks book={item} key={item._id} />
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
