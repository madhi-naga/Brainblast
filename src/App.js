import React from "react";
import MainMenu from "./Components/MainMenu";
import Navbar from "./Components/NavBar";
import Leaderboard from "./Leaderboard/Leaderboard";
import Instructions from "./Components/Instructions";
import UsernameInputForm from "./Components/UsernameInputForm";
import MemoryGame from "./JasperGame/MemoryGame";
import NumberHunt from "./JiahaoGame/NumberHunt";
import Minesweeper from "./JonathanGame/Minesweeper";
import AimTrainer from "./TevisGame/AimTrainer"
import ReverseWord from "./MadhiGame/ReverseWord"
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
      <Route path="/game1" component={Minesweeper} />
      <Route path="/game2" component={ReverseWord} />
      <Route path="/game3" component={MemoryGame} />
      <Route path="/game4" component={NumberHunt} />
      <Route path="/game5" component={AimTrainer} />
    </Router>
  );
}

export default App;
