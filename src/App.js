import React from "react";
import mainMenu from "./Components/mainMenu"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Route exact path="/" component={mainMenu} />
      <Route path="/home" component={mainMenu} />
    </Router>
  );
}

export default App;
