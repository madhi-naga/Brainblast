import React, { createContext, useState, useEffect } from "react";
export const ScoreContext = createContext();

export default ({ children }) => {
  const [username, setUsername] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);
  const [totalScore, setTotalScore] = useState(0);


  useEffect(() => {
    setUsername("Test Username");
    setTotalScore(score1 + score2 + score3 + score4 + score5);
  }, []);

  return (
    <div>
        <ScoreContext.Provider
            value={{ username, setUsername, score1, setScore1 , score2, setScore2, score3, setScore3, score4, setScore4, score5, setScore5, totalScore, setTotalScore}}
        >
            {children}
        </ScoreContext.Provider>
    </div>
  );
};
