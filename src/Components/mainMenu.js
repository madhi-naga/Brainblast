import React, { useState, useContext, useEffect } from "react";
import {ScoreContext} from "../Contexts/ScoreContext";


function MainMenu(){
    useEffect(() => {
      }, []);
    const scoreContext =  useContext(ScoreContext);
    scoreContext.setUsername("sss");
    scoreContext.setScore1(1);
    return (
        <div>
            username: {scoreContext.username} totalScore: {scoreContext.totalScore} Score1: {scoreContext.score1}
        </div>
    );
}

export default MainMenu;
