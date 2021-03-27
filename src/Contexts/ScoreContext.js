import React, { createContext, useState, useEffect } from "react";

export const ScoreContext = createContext();


const ScoreCont = ({ children }) => {
  const [username, setUsername] = useState("SampleUser");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(10);
  const [weightedScore1, setWeightedScore1] = useState(0);
  const [weightedScore2, setWeightedScore2] = useState(0);
  const [weightedScore3, setWeightedScore3] = useState(0);
  const [weightedScore4, setWeightedScore4] = useState(0);
  const [weightedScore5, setWeightedScore5] = useState(10);
  const [totalScore, setTotalScore] = useState(0);


  useEffect(() => {
    setTotalScore(weightedScore1+weightedScore2+weightedScore3+weightedScore4+weightedScore5);
  },[weightedScore1,weightedScore2,weightedScore3,weightedScore4,weightedScore5]);

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

export default ScoreCont;