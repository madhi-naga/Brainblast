import React, { useState } from "react";
import './AimTrainer.css';
import randomNumber from "./RandomNumber";
import { Link } from "react-router-dom";


function AimTrainer() {
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

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

  function resetTimer(){
    setTimer(40);
  };

  function launchTimer(){
    for (let i = 40; i > 0; i--) {
      decreaseTimer(i);
    }
  };

  function countShot() {
    setScore(score + 1);
  };

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
      <h3 style={{color: 'black'}}>Click as many targets as possible in 40 seconds!</h3>
      <div className="statsAimTrainerContainer">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" 
        rel="stylesheet"></link>
        <h3 id="timer" style={{color: 'black'}}> Time: <span style={{ color: "black"}}>{timer}</span></h3>
        <h3 id="currScore" style={{color: 'black'}}> Score: <span style={{ color: "black"}}>{score}/100</span></h3>
      </div>
      <div className="gameContainer"> {
        <div className="buttonContainer">
        <button className="btn btn-dark" onClick={() => {
          setScore(0);
          resetTimer();
          launchTimer();
          getPosition();
        }}>Start</button>
        <Link to={"/menu"} role="button" id="gotoMenu" className="btn btn-dark">Menu</Link>
        </div>
      }


      </div>
      </div>
    )
  }
};

export default AimTrainer;
