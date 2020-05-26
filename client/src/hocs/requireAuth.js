import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect } from 'react-router-dom';
export default ChildComponent => {
  const AuthGuard = props => {
    const context = useContext(AuthContext);

    return (
      <>
        {context.state.isLoaded && !context.state.isLogged && (
          <Redirect to='/login' />
        )}

        {context.state.isLoaded && context.state.isLogged && (
          <ChildComponent user={context.state.user} {...props} />
        )}
      </>
    );
  };

  return AuthGuard;
};
