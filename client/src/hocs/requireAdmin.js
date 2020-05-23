import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect } from 'react-router-dom';
export default ChildComponent => {
  const AdminGuard = props => {
    const context = useContext(AuthContext);

    return (
      <>
        {context.state.isLoaded && !context.state.isAdmin && (
          <Redirect to='/' />
        )}

        {context.state.isLoaded && context.state.isLogged && (
          <ChildComponent user={context.state.user} />
        )}
      </>
    );
  };

  return AdminGuard;
};
