import React, { useContext } from 'react';

import requireAuth from '../../hocs/requireAuth';

const Home = (props) => {
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <p>Welcome Logged User</p>
      {/* <h1>Welcome Logged User</h1>
      <h1>Welcome Logged User</h1>
      <h1>Welcome Logged User</h1>
      <h1>Welcome Logged User</h1> */}
      





    <section class="section section--first section--bg" data-bg="img/section/section.jpg">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section__wrap">
              <h2 class="section__title">Welcome Back UserName </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="filter">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="filter__content">
              <div class="filter__items">

                <div class="filter__item" id="filter__genre">
                  <span class="filter__item-label">Books To View:</span>

                  <div class="filter__item-btn dropdown-toggle" role="navigation" id="filter-genre"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <input type="button" value="All Book"/>
                    <span></span>
                  </div>

                  <ul class="filter__item-menu dropdown-menu scrollbar-dropdown"
                    aria-labelledby="filter-genre">
                    <li>All Books</li>
                    <li>Read</li>
                    <li>Currently Reading</li>
                    <li>Want To Read</li>
                  </ul>
                </div>


              </div>


              <button class="filter__btn" type="button">apply filter</button>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="catalog">
		<div class="container">
			<div class="row">

				<div class="col-6 col-sm-12 col-lg-6">
					<div class="card card--list">
						<div class="row">
							<div class="col-12 col-sm-4">
								<div class="card__cover">
									<img src="img/covers/cover.jpg" alt=""/>
									<a href="#" class="card__play">
										<i class="icon ion-ios-eye"></i>
									</a>
								</div>
							</div>

							<div class="col-12 col-sm-8">
								<div class="card__content">
									<h3 class="card__title"><a href="#">I Dream in Another Language</a></h3>
									<span class="card__category">
										<a href="#">Action</a>
										<a href="#">Triler</a>
									</span>

									<div class="card__wrap">
										<span class="card__rate"><i class="icon ion-ios-star"></i>8.4</span>
									</div>

									<div class="card__description">

										<div class="filter__item" id="filter__quality">
											<span class="filter__item-label">Shelve:</span>

											<div class="filter__item-btn dropdown-toggle" role="navigation"
												id="filter-quality" data-toggle="dropdown" aria-haspopup="true"
												aria-expanded="false">
												<input type="button" value="Reading"/>
												<span></span>
											</div>

											<ul class="filter__item-menu dropdown-menu scrollbar-dropdown"
												aria-labelledby="filter-quality">
												<li>want to read</li>
												<li>reading</li>
												<li>read</li>
											</ul>
										</div>



										<input id="hidden_rate_input" type="hidden" value="0" />
										<div class="filter__item" id="filter__rate">
											<div class="form__slider">
												<div class="form__slider-rating" id="slider__rating"></div>
												<div class="form__slider-value" id="form__slider-value"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div class="col-12">
					<ul class="paginator paginator--list">
						<li class="paginator__item paginator__item--prev">
							<a href="#"><i class="icon ion-ios-arrow-back"></i></a>
						</li>
						<li class="paginator__item"><a href="#">1</a></li>
						<li class="paginator__item paginator__item--active"><a href="#">2</a></li>
						<li class="paginator__item"><a href="#">3</a></li>
						<li class="paginator__item"><a href="#">4</a></li>
						<li class="paginator__item paginator__item--next">
							<a href="#"><i class="icon ion-ios-arrow-forward"></i></a>
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
