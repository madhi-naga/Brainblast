import React, {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import {WeighScores} from "../Functions/WeighScores";


function MainMenu(){
    const scoreContext =  useContext(ScoreContext);
    WeighScores();
    return (
        <div>
            username: {scoreContext.username} totalScore: {scoreContext.totalScore} Score1: {scoreContext.score1}
        </div>
    );
}

export default MainMenu;
