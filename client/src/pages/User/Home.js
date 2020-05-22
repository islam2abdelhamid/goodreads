import React, { useContext } from 'react';

import requireAuth from '../../hocs/requireAuth';
import { AuthContext } from '../../context/AuthContext';
const Home = (props) => {
	const context = useContext(AuthContext);
	
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <p>Welcome Logged User</p>     

    <section className="section section--first section--bg" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__wrap">
				<h2 className="section__title">Welcome Back <strong>{context.state.isLoaded && context.state.user.firstName} {context.state.isLoaded && context.state.user.lastName}</strong> </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="filter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="filter__content">
              <div className="filter__items">

                <div className="filter__item" id="filter__genre">
                  <span className="filter__item-label">Books To View:</span>

                  <div className="filter__item-btn dropdown-toggle" role="navigation" id="filter-genre"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="button" value="All Book"/>
                    <span></span>
                  </div>

                  <ul className="filter__item-menu dropdown-menu scrollbar-dropdown"
                    aria-labelledby="filter-genre">
                    <li>All Books</li>
                    <li>Read</li>
                    <li>Currently Reading</li>
                    <li>Want To Read</li>
                  </ul>
                </div>


              </div>


              <button className="filter__btn" type="button">apply filter</button>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="catalog">
		<div className="container">
			<div className="row">

				<div className="col-6 col-sm-12 col-lg-6">
					<div className="card card--list">
						<div className="row">
							<div className="col-12 col-sm-4">
								<div className="card__cover">
									<img src="img/covers/cover.jpg" alt=""/>
									<a href="#" className="card__play">
										<i className="icon ion-ios-eye"></i>
									</a>
								</div>
							</div>

							<div className="col-12 col-sm-8">
								<div className="card__content">
									<h3 className="card__title"><a href="#">I Dream in Another Language</a></h3>
									<span className="card__category">
										<a href="#">Action</a>
										<a href="#">Triler</a>
									</span>

									<div className="card__wrap">
										<span className="card__rate"><i className="icon ion-ios-star"></i>8.4</span>
									</div>

									<div className="card__description">

										<div className="filter__item" id="filter__quality">
											<span className="filter__item-label">Shelve:</span>

											<div className="filter__item-btn dropdown-toggle" role="navigation"
												id="filter-quality" data-toggle="dropdown" aria-haspopup="true"
												aria-expanded="false">
												<input type="button" value="Reading"/>
												<span></span>
											</div>

											<ul className="filter__item-menu dropdown-menu scrollbar-dropdown"
												aria-labelledby="filter-quality">
												<li>want to read</li>
												<li>reading</li>
												<li>read</li>
											</ul>
										</div>



										<input id="hidden_rate_input" type="hidden" value="0" />
										<div className="filter__item" id="filter__rate">
											<div className="form__slider">
												<div className="form__slider-rating" id="slider__rating"></div>
												<div className="form__slider-value" id="form__slider-value"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div className="col-12">
					<ul className="paginator paginator--list">
						<li className="paginator__item paginator__item--prev">
							<a href="#"><i className="icon ion-ios-arrow-back"></i></a>
						</li>
						<li className="paginator__item"><a href="#">1</a></li>
						<li className="paginator__item paginator__item--active"><a href="#">2</a></li>
						<li className="paginator__item"><a href="#">3</a></li>
						<li className="paginator__item"><a href="#">4</a></li>
						<li className="paginator__item paginator__item--next">
							<a href="#"><i className="icon ion-ios-arrow-forward"></i></a>
						</li>
					</ul>
				</div>


			</div>
		</div>
	</div>



    </div>
  );
};
export default requireAuth(Home);
