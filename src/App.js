import React from "react";
import MainMenu from "./Components/MainMenu"
import Navbar from "./Components/NavBar"
import Leaderboard from "./Components/Leaderboard"
import Instructions from "./Components/Instructions"
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/" component={MainMenu} />
      <Route path="/home" component={MainMenu} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/instructions" component={Instructions} />
    </Router>
  );
}

export default App;
