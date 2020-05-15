import React from 'react';
import App from './App';
import LoginContextProvider from './context/AuthContext';

const App = () => {
  return (
    <LoginContextProvider>
      <App />
    </LoginContextProvider>
  );
};

export default App;
