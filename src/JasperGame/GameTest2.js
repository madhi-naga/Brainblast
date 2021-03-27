import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";

function GameTest2(){
    const scoreContext = useContext(ScoreContext);

    function onClick(){
        var oldScore = scoreContext.score2;
        var newScore = scoreContext.score2+1;
        var currTotal = scoreContext.totalScore;
        scoreContext.setScore2(newScore);
        scoreContext.setTotalScore(currTotal- oldScore + newScore);
    }
    return(
        <div>
            <button
            onClick={onClick}
            >
                Increment Score2
            </button>
        </div>
    )
}
export default GameTest2;