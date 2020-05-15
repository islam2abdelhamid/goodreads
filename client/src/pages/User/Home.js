import React, { useContext } from 'react';

import requireAuth from '../../hocs/requireAuth';

const Home = (props) => {
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <h1>Welcome Logged User</h1>
    </div>
  );
};
export default requireAuth(Home);
