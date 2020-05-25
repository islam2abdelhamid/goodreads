import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from '../../axios/logged';
import requireAuth from '../../hocs/requireAuth'

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
        },
        section: {
            backgroundImage: `url("assets/img/section/section.jpg")`,
        }
    };


    return (
    <>
        <section className="section section--first section--bg" style={styles.section} data-bg="assets/img/section/section.jpg">
            <div className="container" >
                <div className="row">
                    <div className="col-12">
                        <div className="section__wrap">
                            <h2 className="section__title">Authors </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="catalog">
		<div className="container">
			<div className="row">
				{/* <div class="col-6 col-sm-12 col-lg-6"> */}
					{/* <div class="card card--list"> */}
						<div className="row" style={styles.container}>
                        {authors.map((author)=>(
                            <div style={styles.item}  key={author._id}>
                                    <div className="card__cover">
                                        <img src="https://picsum.photos/200/300" alt=""/>
                                        <a href="#" className="card__play">
                                            <i className="icon ion-ios-eye"></i>
                                        </a>
                                    </div>
                                    <div style={{display: 'flex',justifyContent: 'center',}} className="card__content">
                                         <h3 className="card__title"><a href="#">{author.firstName} {author.lastName}</a></h3>
                                    </div>
                            </div>
                        )
                    )}
							
						</div>
					{/* </div> */}
				{/* </div> */}

				
			</div>
		</div>
	</div>
        
    </>
  );
};
export default requireAuth(Authors);