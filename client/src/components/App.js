import React, { useEffect, useContext, useState } from 'react';
import GuestHome from '../pages/Guest/Home';
import UserHome from '../pages/User/Home';
import Login from '../pages/Guest/Login';
import { AuthContext } from '../context/AuthContext';
import { CHECK_AUTH } from '../context/AuthContext/actionTypes';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Logout from '../pages/User/Logout';
import { Header } from './Header/Header';
import Register from '../pages/Guest/Register';
import Books from '../pages/Guest/Books';

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
      <Header isLogged={context.state.isLogged}/>
        <Switch>
          <Route path='/' exact component={GuestHome} />
          <Route path='/home' exact component={UserHome} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/Books' exact component={Books}/>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
