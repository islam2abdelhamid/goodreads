import React from 'react';
import requireGuest from '../../hocs/requireGuest';

const Home = (props) => {
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <h1>Welcome Guest User</h1>
    </div>
  );
};
export default requireGuest(Home);
