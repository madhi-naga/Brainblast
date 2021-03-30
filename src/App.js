import React from "react";
import MainMenu from "./Components/MainMenu";
import Navbar from "./Components/NavBar";
import Leaderboard from "./Components/Leaderboard";
import Instructions from "./Components/Instructions";
import UsernameInputForm from "./Components/UsernameInputForm";
import GameTest from "./JasperGame/GameTest";
import GameTest2 from "./JasperGame/GameTest2";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/" component={UsernameInputForm} />
      <Route path="/menu" component={MainMenu} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/instructions" component={Instructions} />
      <Route path="/game1" component={GameTest} />
      <Route path="/game2" component={GameTest2} />
      <Route path="/game3" component={GameTest} />
      <Route path="/game4" component={GameTest} />
      <Route path="/game5" component={GameTest} />
    </Router>
  );
}

export default App;
