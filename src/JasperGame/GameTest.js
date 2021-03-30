import {useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import CalcScores from "../Helpers/CalcScores";

function GameTest(){
    const scoreContext = useContext(ScoreContext);
    
    
    function calcScores(){
        var newScore = scoreContext.score1+1;
        CalcScores(1,newScore,scoreContext);
    }
    return(
        <div>
            <button
            onClick={calcScores}
            >
                Increment Score 1
            </button>
        </div>
    )
}
export default GameTest;