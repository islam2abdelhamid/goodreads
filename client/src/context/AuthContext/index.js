import React, { createContext } from 'react';
import reducer from './reducer';
import useAsyncReducer from '../../hocs/useAsyncReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [state, dispatch] = useAsyncReducer(reducer, {
    user: null,
    isLogged: false,
    isLoaded:false
  });
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
