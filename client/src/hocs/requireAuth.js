import React, { useContext } from 'react';
import { AuthContext } from './../context/AuthContext';
export default ChildComponent => {
  const AuthGuard = props => {
    const context = useContext(AuthContext);

    if (context.state.isLoaded && context.state.isLogged === false) {
      props.history.push('/');
    }
    return (
      <>{context.state.user && <ChildComponent user={context.state.user} />}</>
    );
  };

  return AuthGuard;
};
