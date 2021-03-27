import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";

function GameTest(){
    const scoreContext = useContext(ScoreContext);

    function onClick(){
        var oldScore = scoreContext.score1;
        var newScore = scoreContext.score1+1;
        var currTotal = scoreContext.totalScore;
        scoreContext.setScore1(newScore);
        scoreContext.setTotalScore(currTotal- oldScore + newScore);
    }
    return(
        <div>
            <button
            onClick={onClick}
            >
                Increment Score1
            </button>
        </div>
    )
}
export default GameTest;