import React, { useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import requireAuth from '../../hocs/requireAuth';
import { AuthContext } from '../../context/AuthContext';
import { LOGOUT } from '../../context/AuthContext/actionTypes';

const Logout = (props) => {
  const context = useContext(AuthContext);
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    console.log('logout');
    context.dispatch({
      type: LOGOUT,
    });
    setLoggedOut(true);
  }, []);
  return loggedOut && <Redirect to='/' />;
};
export default requireAuth(Logout);
