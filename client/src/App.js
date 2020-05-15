import React, { useEffect, useState, useContext } from 'react';
import Login from './components/User/Login';
import { AuthContext } from './context/AuthContext';
import { CHECK_AUTH } from './context/AuthContext/actionTypes';

const App = () => {
  const context = useContext(AuthContext);

  console.log(context);

  // useEffect(() => {
  //   context.dispatch({
  //     type: CHECK_AUTH,
  //   });
  // }, []);

  return <Login />;
};

export default App;
