import React, {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import {WeighScores} from "../Functions/WeighScores";
import { Link } from "react-router-dom";
import "./MainMenu.css";


function MainMenu(){
    const scoreContext =  useContext(ScoreContext);
    console.log(scoreContext.totalScore);
    return (
            <div><link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                rel="stylesheet"
            ></link>
            <h1 className ="titleHeader">BrainBlast!</h1>
            <div className = "btnContainer">
                <Link to={"/game1"} role="button" className="btn btn-dark">Game 1 </Link>
                <Link to={"/game2"} role="button" className="btn btn-dark">Game 2 </Link>
                <Link to={"/game3"} role="button" className="btn btn-dark">Game 3 </Link>
                <Link to={"/game4"} role="button" className="btn btn-dark">Game 4 </Link>
                <Link to={"/game5"} role="button" className="btn btn-dark">Game 5 </Link>
            </div>
            <h1 className ="username">Logged in as {scoreContext.username}</h1>
            <h1 className ="totalScore">Total Score: {scoreContext.totalScore}</h1>
            
            <h1 className ="score">Game 1 Score: {scoreContext.score1} </h1>
            <h1 className ="score">Game 2 Score: {scoreContext.score2} </h1>
            <h1 className ="score">Game 3 Score: {scoreContext.score3} </h1>
            <h1 className ="score">Game 4 Score: {scoreContext.score4} </h1>
            <h1 className ="score">Game 5 Score: {scoreContext.score5} </h1>
        </div>
    );
}

export default MainMenu;
