import React, {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import {WeighScores} from "../Functions/WeighScores";
import "./MainMenu.css";


function MainMenu(){
    const scoreContext =  useContext(ScoreContext);
    
    return (
            <div><link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                rel="stylesheet"
            ></link>
            <h1 className ="titleHeader">BrainBlast!</h1>
            <container className = "btnContainer">
                <button type="button" className="btn btn-dark">Game 1</button>
                <button type="button" className="btn btn-dark">Game 2</button>
                <button type="button" className="btn btn-dark">Game 3</button>
                <button type="button" className="btn btn-dark">Game 4</button>
                <button type="button" className="btn btn-dark">Game 5</button>
            </container>
            <h1 className ="username">Logged in as {scoreContext.username}</h1>
            <h1 className ="totalScore">Total Score: {scoreContext.totalScore}</h1>
            <br></br>
            username: {scoreContext.username}
            <br></br>
            totalScore: {scoreContext.totalScore} 
            <br></br>
            Score1: {scoreContext.score1} 
            <br></br>
            Score2: {scoreContext.score2}
            <br></br>
            Score3: {scoreContext.score3}
            <br></br>
            Score4: {scoreContext.score4}
            <br></br>
            Score5: {scoreContext.score5}
        </div>
    );
}

export default MainMenu;
