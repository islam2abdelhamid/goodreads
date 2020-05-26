import React, {useState, useEffect } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'

const Category = props => {
    const [category, setCategory] = useState(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [booksPerPage, setBooksPerPage] = useState(2);
    // const [activeLinkIndex, setActiveLinkIndex] = useState(1);
    // const pageNumbers = [];
    
    // if(category){
    // for(let i = 1 ; i <= Math.ceil(category.books.length / booksPerPage ); i++){
    //       pageNumbers.push(i);
    //   }
    // }
   
    useEffect(() => {
        axios
        .get('/categories/' + props.match.params.id)
        .then((result) => {
            setCategory(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
    
    console.log(category);
    
      const styles = {
        container: {
            flex: 1,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap:true,
        },
        itemCard: {
            margin: '10px',
            padding: '10px',
            width:'28%',
        },
        section: {
            backgroundImage: `url("assets/img/section/section.jpg")`,
        }
    };
    
    //get Current Books
    // const indexOfLastBook = booksPerPage*currentPage;
    // const indexOfFirstBook = indexOfLastBook-booksPerPage;
    // let currentBooks = null;
    // if(category){
    //      currentBooks = category.books.slice(indexOfFirstBook,indexOfLastBook);
    // }

    //paginate
    // const paginate = (pageNo) => setCurrentPage(pageNo);

    return (
        category && (
        <>
        <section className="section section--first section--bg"  data-bg="assets/img/section/section.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">{category.name} </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog" >
		<div className="container" >
			<div className="row">
                <div className="row" style={styles.container}>
                        {category.books.map((book)=>(
                            <div className="card card--big" style={styles.itemCard} key={book._id}>
                                    <div className="card__cover">
                                        <img style={{height:'500px'}} src={(book.cover && 'http://localhost:5000' + book.cover)} alt='No Cover'/>
                                        <a href={'/books/' + book._id} className="card__play">
                                            <i className="icon ion-ios-eye"></i>
                                        </a>
                                    </div>
                                    <div  className="card__content">
                                         <h3 className="card__title"><a href={'/books/' + book._id}>{book.name}</a></h3>
                                        <span className='card__rate'>
                                            <i className='icon ion-ios-star'></i> {book.rate || '0'}
                                        </span>
                                    </div>
                            </div>
                        )
                    )}
                </div>
                {/* <div className="col-12">

					<ul className="paginator paginator--list">
                    <li className="paginator__item paginator__item--prev">
							<a href="#"><i className="icon ion-ios-arrow-back"></i></a>
						</li>
                    {pageNumbers.map((number)=>(
                        <li  key={number} className={activeLinkIndex === number ? 'paginator__item paginator__item--active' : 'paginator__item'}><a onClick={(e) => {e.preventDefault();paginate(number);setActiveLinkIndex(number);}} href="!#">{number}</a></li>
                    ))}
                    <li className="paginator__item paginator__item--next">
							<a href="#"><i className="icon ion-ios-arrow-forward"></i></a>
                    </li>
					</ul>
				</div> */}
			</div>
		</div>
	</div>
        
    </>
        )
  );
};
export default requireAuth(Category);