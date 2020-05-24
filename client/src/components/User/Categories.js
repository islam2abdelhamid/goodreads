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
        <div class="container">
            <div class="row">
                {categories.map((cat)=>(
                     <div className="col-md-3" key={cat._id}>
                        <div className="category__card">
                            <h2><a  href="#">{cat.name}</a></h2>
                        </div>
                    </div>
                    )
                )}
            </div>
        </div>
    </div>
    <footer className="footer">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="footer__copyright">
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