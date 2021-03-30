import React from 'react';
import App from '../App';
import ScoreProvider from '../Contexts/ScoreContext';

function MenuController(){
    return (
    <ScoreProvider>
        <App />
  </ScoreProvider>)
}

export default MenuController;