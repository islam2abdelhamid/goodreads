import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'
import {Link} from "react-router-dom"
const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const token = localStorage.getItem('goodReadsToken');
    useEffect(() => {
        axios
          .get('/authors')
          .then((result) => {
            setAuthors(authors.concat(result.data))
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
        item: {
            margin: '10px',
            padding: '10px',
            width:'28%'
        },
        section: {
            backgroundImage: `url("assets/img/section/section.jpg")`,
        }
    };


    return (
    <>  
        <section className="section section--first section--bg"  data-bg="assets/img/section/section.jpg">
            <div className="container" >
                <div className="row" >
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Authors </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog" style={{}}>
            <div className="container">
                <div className="row">
                    <div className="row" style={styles.container}>
                            {authors.map((author)=>(
                                <div style={styles.item}  key={author._id}>
                                        <div className="card__cover">
                                            <img src="https://picsum.photos/200/300" alt=""/>
                                            <Link to={`/authors/${author._id}`} className="card__play">
                                                <i className="icon ion-ios-eye"></i>
                                            </Link>
                                        </div>
                                        <div style={{display: 'flex',justifyContent: 'center',}} className="card__content">
                                            <h1 style={{fontSize: '150%' }} className="card__title"><a  href="#">{author.firstName} {author.lastName}</a></h1>
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
export default requireAuth(Authors);