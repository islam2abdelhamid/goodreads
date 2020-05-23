import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect } from 'react-router-dom';
export default ChildComponent => {
  const GuestGuard = props => {
    const context = useContext(AuthContext);

    return (
      <>
        {context.state.isLoaded && context.state.isLogged && (
          <Redirect to='/home' />
        )}
        {context.state.isLoaded && !context.state.isLogged && (
          <ChildComponent />
        )}
      </>
    );
  };

  return GuestGuard;
};
