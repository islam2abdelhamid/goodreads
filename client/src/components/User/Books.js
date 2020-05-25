import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'

const Books = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios
        .get('/books')
        .then((result) => {
          setBooks(result.data)
        })
        .catch((err) => {
          console.log(err);
        });
      }, [])
    
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


    return (
    <>
        <section className="section section--first section--bg"  data-bg="assets/img/section/section.jpg">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Books </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog" >
		<div className="container" >
			<div className="row">
                <div className="row" style={styles.container}>
                        {books.map((book)=>(
                            <div className="card card--big" style={styles.itemCard}  key={book._id}>
                                    <div className="card__cover">
                                        <img src="https://picsum.photos/200/300" alt=""/>
                                        <a href={'/books/' + book._id} className="card__play">
                                            <i className="icon ion-ios-eye"></i>
                                        </a>
                                    </div>
                                    <div  className="card__content">
                                         <h3 className="card__title"><a href={'/books/' + book._id}>{book.name}</a></h3>
                                         <span class="card__category">
                                            <a style={{fontSize: '125%' }}  href={'/categories/' + book.category._id}><strong>{book.category.name}</strong></a>
                                            <a style={{fontSize: '125%' }} href={'/authors/' + book.author._id}>by : <strong>{book.author.firstName} {book.author.lastName}</strong></a>
                                        </span>
                                        <span className='card__rate'>
                                            <i className='icon ion-ios-star'></i> {book.rate || '0'}
                                        </span>
                                    </div>
                            </div>
                        )
                    )}
                </div>
			</div>
		</div>
	</div>
        
    </>
  );
};
export default requireAuth(Books);