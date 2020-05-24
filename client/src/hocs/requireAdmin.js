import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Redirect } from 'react-router-dom';
export default ChildComponent => {
  const AdminGuard = props => {
    const context = useContext(AuthContext);

    return (
      <>
        {(context.state.isLoaded && context.state.isLogged && context.state.user.isAdmin)?
        (<ChildComponent user={context.state.user} {...props}/>):(<Redirect to='/' />)}
      </>
    );
  };

  return AdminGuard;
};


