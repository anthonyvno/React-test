import React from 'react';
import './App.css';
import logo from './logo.svg';

const App = () => {
  return (
    <div className="App-greeting">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Welcome to the EY CogniStreamer coding challenge!</h1>
      Please have a look at the README.md file in this repository for information on how to get
      started.
    </div>
  );
};

export default React.memo(App);
