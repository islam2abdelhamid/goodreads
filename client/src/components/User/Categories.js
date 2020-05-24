import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    let index = 0
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


    return (
    <>
        <section class="section section--first section--bg" data-bg="assets/img/section/section.jpg">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="section__wrap">
                            <h2 class="section__title">Categories </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="categories">
        <div class="container">
            <div class="row">
                {categories.map((cat)=>(
                     <div class="col-md-3">
                        <div class="category__card">
                            <h2><a href="#">{cat.name}</a></h2>
                        </div>
                    </div>
                    )
                )}
            </div>
        </div>
    </div>
    <footer class="footer">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="footer__copyright">
						<ul>
							<li><a href="#">Terms of Use</a></li>
							<li><a href="#">Privacy Policy</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
    </>
  );
};
export default requireAuth(Categories);