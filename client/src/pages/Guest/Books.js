import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import axios from '../../axios';
import requireGuest from '../../hocs/requireGuest';


function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);


  useEffect(() => {
    axios
      .get('http://localhost:5000/books/top_books', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('goodReadsToken'),
        },
      })

      .then(res => {
        setBooks(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/categories/top_categories', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('goodReadsToken'),
        },
      })

      .then(res => {
        setCategories(res.data);
      });
  }, []);


  useEffect(() => {
    axios
      .get('http://localhost:5000/authors/top_authors', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('goodReadsToken'),
        },
      })

      .then(res => {
        setAuthors(res.data);
      });
  }, []);

  return (
    <section className='home'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='home__title'>
              <b>Popular Books</b>
            </h1>
          </div>

          <div className='col-12 mt-5'>
            {books.length > 0 && (
              <OwlCarousel className='owl-theme' margin={10} items={4} nav>
                {books.map(item => (
                  <div className='item' key={item._id}>
                    <div className='card card--big'style={{backgroundColor:"#2b2b31" }} >
                      <div className='card__cover' >
                        <img src='assets/img/covers/cover.jpg' alt='' />
                        <a href='#' className='card__play'>
                          <i className='icon ion-ios-eye'></i>
                        </a>
                      </div>

                      <div className='card__content'>
                        <h3 className='card__title'  >
                          <a  href='#'>
                            {item.name}
                          </a>
                        </h3>
                        <span className='card__category'>
                          {item.category && (
                            <a href='#'>{item.category.name}</a>
                          )}
                        </span>
                        <span className='card__rate'>
                          <i className='icon ion-ios-star'></i>8.4
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
      <section class="section section--bg" data-bg="img/section/section.jpg">
		<div class="container">
			<div class="row">

      <div class="col-6">
					<h2 class="section__title">Popular Authors</h2>
          {authors.map(item => (
					<ul class="author__list">
						<li><a href="#">{item.firstName +" "+ item.lastName}</a></li>
					</ul>
           ))}
				</div>

				<div class="col-6">
					<h2 class="section__title">Popular Categories</h2>
          {categories.map(item => (
					<ul class="author__list">
						<li><a href="#">{item.name}</a></li>
					</ul>
           ))}
				</div>
         
			</div>
		</div>
    <footer class="footer">
		<div class="container">
			<div class="row">
				
				<div class="col-12">
					<div class="footer__copyright">

					
					</div>
				</div>
			
			</div>
		</div>
	</footer>
	</section>
    </section> 
    
  );
}

export default requireGuest(Books);
