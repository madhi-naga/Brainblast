import React, {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import ErrorMessage from "../Components/ErrorMessage.js";

import { Link } from "react-router-dom";
import "./MainMenu.css";


function MainMenu(){
    const scoreContext =  useContext(ScoreContext);
    if (scoreContext.username!==null){
        return (
                <div>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
                <link
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
                
                <h1 className ="score">Game 1 Score: {scoreContext.score1} | Weighted Score: {scoreContext.weightedScore1} </h1>
                <h1 className ="score">Game 2 Score: {scoreContext.score2} | Weighted Score: {scoreContext.weightedScore2}</h1>
                <h1 className ="score">Game 3 Score: {scoreContext.score3} | Weighted Score: {scoreContext.weightedScore3}</h1>
                <h1 className ="score">Game 4 Score: {scoreContext.score4} | Weighted Score: {scoreContext.weightedScore4}</h1>
                <h1 className ="score">Game 5 Score: {scoreContext.score5} | Weighted Score: {scoreContext.weightedScore5}</h1>
            </div>
        );
    }
    else{
        return <ErrorMessage/>;
    }
}

export default MainMenu;
