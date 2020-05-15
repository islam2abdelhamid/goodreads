import React from 'react';
import App from './components/App';
import AuthContextProvider from './context/AuthContext';

const Root = () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

export default Root;
