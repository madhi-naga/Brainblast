import React, { createContext, useState, useEffect } from "react";
import { WeighScores } from "../Functions/WeighScores";

export const ScoreContext = createContext();


export default ({ children }) => {
  const [username, setUsername] = useState("Test Username");
  const [score1, setScore1] = useState(100);
  const [score2, setScore2] = useState(80);
  const [score3, setScore3] = useState(60);
  const [score4, setScore4] = useState(40);
  const [score5, setScore5] = useState(20);
  const [weightedScore1, setWeightedScore1] = useState(100);
  const [weightedScore2, setWeightedScore2] = useState(80);
  const [weightedScore3, setWeightedScore3] = useState(60);
  const [weightedScore4, setWeightedScore4] = useState(40);
  const [weightedScore5, setWeightedScore5] = useState(20);
  const [totalScore, setTotalScore] = useState(0);


  useEffect(() => {
    setTotalScore(score1+score2+score3+score4+score5);
  }, []);

  return (
    <div>
        <ScoreContext.Provider
            value={{ username, setUsername, score1, setScore1 , score2, setScore2, score3, setScore3, 
                score4, setScore4, score5, setScore5, weightedScore1, setWeightedScore1, weightedScore2, 
                setWeightedScore2, weightedScore3, setWeightedScore3,weightedScore4, setWeightedScore4,
                weightedScore5, setWeightedScore5,totalScore, setTotalScore}}
        >
            {children}
        </ScoreContext.Provider>
    </div>
  );
};
