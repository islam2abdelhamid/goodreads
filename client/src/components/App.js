import React, { useEffect, useContext, useState } from 'react';
import GuestHome from '../pages/Guest/Home';
import UserHome from '../pages/User/Home';
import Login from '../pages/Guest/Login';
import { AuthContext } from '../context/AuthContext';
import { CHECK_AUTH } from '../context/AuthContext/actionTypes';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Logout from '../pages/User/Logout';

const App = (props) => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.dispatch({
      type: CHECK_AUTH,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        {context.state.isLogged || (
          <>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
        {context.state.isLogged && (
          <>
            <Link to='/home'>Home</Link>
            <Link to='/logout'>Logout</Link>
          </>
        )}

        <Switch>
          <Route path='/' exact component={GuestHome} />
          <Route path='/home' exact component={UserHome} />
          <Route path='/login' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
