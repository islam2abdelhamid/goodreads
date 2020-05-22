import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
export default (ChildComponent) => {
  const AdminGuard = (props) => {
    const context = useContext(AuthContext);

    if (context.state.isLoaded && context.state.user.isAdmin === false) {
      props.history.push('/');
    }
    return (
      <>
        <ChildComponent />
      </>
    );
  };

  return AdminGuard;
};
