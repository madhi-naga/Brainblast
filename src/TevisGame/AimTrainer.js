import React, { useContext, useState } from "react";
import './AimTrainer.css';
import randomNumber from "./RandomNumber";
import { Link } from "react-router-dom";
import {ScoreContext} from "../Contexts/ScoreContext";
import CalcScores from "../Helpers/CalcScores";
import axios from 'axios';
const urlBackend = 'https://brainblast-be.herokuapp.com';

function AimTrainer() {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const scoreContext = useContext(ScoreContext);
  const [bestScore, setBestScore] = useState(0);
  var firstRun = 1;
  

  function getPosition(){
    let leftPosition = randomNumber(0, 94);
    let topPosition = randomNumber(0, 85);
    setLeft(leftPosition);
    setTop(topPosition);
  };

  function decreaseTimer(i){
    setTimeout(() => {
      setTimer(40 - i);
    }, 1000 * i);
  };

  function updateBestScore() {
    if (score > bestScore) {
      setBestScore(score);
    } 
  }

  function resetTimer(){
    setTimer(40);
  };

  function startTimer(){
    for (let i = 40; i > 0; i--) {
      decreaseTimer(i);
    }
  };

  function countShot() {
    setScore(score + 1);
  };

  function saveScores() {
    if (firstRun == 0) {
      CalcScores(5, bestScore, scoreContext);
      var params = {
        username: scoreContext.username,
        minigame_scores: {
            minigame_5: bestScore
        }
      }
      axios.post(`${urlBackend}/score/update`, params)
        .then( resp => alert("Updated Score"))
        .catch(error => console.log(error));
      document.getElementById("gotoMenu").click();
    } else {
      CalcScores(5, score, scoreContext);
      var params = {
        username: scoreContext.username,
        minigame_scores: {
            minigame_5: score
        }
      }
      axios.post(`${urlBackend}/score/update`, params)
        .then( resp => alert("Updated Score"))
        .catch(error => console.log(error));
      document.getElementById("gotoMenu").click();
    }
   
  }

  if (timer > 0 && score < 100) {
  return (
    <div className="aimTrainerMainContainer">
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
      <h1 id="titleHeader" style={{color: 'black'}}>Aim Trainer!</h1>
      <h3 style={{color: 'black'}}>Click up to 100 targets as fast as possible in 40 seconds!</h3>
      <div className="statsAimTrainerContainer">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" 
        rel="stylesheet"></link>
        <h3 id="timer" style={{color: 'black'}}> Time: <span style={{ color: "black"}}>{timer}</span></h3>
        <h3 id="currScore" style={{color: 'black'}}> Score: <span style={{ color: "black"}}>{score}/100</span></h3>
        <h3 id="currScore" style={{color: 'black'}}> Best Score: <span style={{ color: "black"}}>{bestScore}/100</span></h3>
      </div>
      <div className="gameContainer">
      {
        <div className="target"
           style={{
             'position': 'relative',
             'left': `${left}%`,
             'top': `${top}%`
           }}
           onClick={(event) => {
             getPosition();
             countShot();
           }}
        >
      </div>
    }
  </div>
</div>
  )
  } else if (timer > 0 && score >= 100) {
    setTimer(0);
  } else {
    return (
      <div className="aimTrainerMainContainer">
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
      <h1 id="titleHeader" style={{color: 'black'}}>Aim Trainer!</h1>
      <h3 style={{color: 'black'}}>Click up to 100 targets as fast as possible in 40 seconds!</h3>
      <div className="statsAimTrainerContainer">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" 
        rel="stylesheet"></link>
        <h3 id="timer" style={{color: 'black'}}> Time: <span style={{ color: "black"}}>{timer}</span></h3>
        <h3 id="currScore" style={{color: 'black'}}> Score: <span style={{ color: "black"}}>{score}/100</span></h3>
        <h3 id="currScore" style={{color: 'black'}}> Best Score: <span style={{ color: "black"}}>{bestScore}/100</span></h3>
      </div>
      <div className="gameContainer"> {
        <div className="buttonContainer">
        <button id="startButton" className="btn btn-dark" onClick={() => {
          firstRun = 0;
          updateBestScore();
          setScore(0);
          resetTimer();
          startTimer();
          getPosition();
        }}>Start</button>
        <button id="exitButton" className="btn btn-dark" style={{width: 'auto'}} onClick={() => {
          updateBestScore();
          saveScores();
        }}>Save Scores and Exit</button>
        <Link to={"/menu"} role="button" id="gotoMenu" className="btn btn-dark btn-large">Exit Without Saving</Link>
        </div>
      }


      </div>
      </div>
    )
  }
};

export default AimTrainer;
