import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
export default (ChildComponent) => {
  const GuestGuard = (props) => {
    const context = useContext(AuthContext);

    if (context.state.isLoaded && context.state.isLogged) {
      props.history.push('/home');
    }
    return (
      <>
        <ChildComponent />
      </>
    );
  };

  return GuestGuard;
};
