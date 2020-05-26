import React, { useState, useEffect } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth';
import { Link } from 'react-router-dom';
import defaultImage from './defaultImage.jpg';

const Category = props => {
    const [category, setCategory] = useState(null);
    
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
    category && (
      <>
        <section
          className='section section--first section--bg'
          data-bg='assets/img/section/section.jpg'
        >
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='section__wrap'>
                  <h2 className='section__title'>{category.name} </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="catalog" >
		<div className="container" >
                <div className="row" style={styles.container}>
                        {category.books.map((book)=>(
                            <div className="card card--big" style={styles.itemCard} key={book._id}>
                                    <div className="card__cover">
                                        <img className='img-thumbnail rounded table__img' style={{height:'500px'}} src={(book.cover && 'http://localhost:5000' + book.cover) || defaultImage} alt='No Cover'/>
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
		</div>
	</div>
        
    </>
        )
  );
};
export default requireAuth(Category);
