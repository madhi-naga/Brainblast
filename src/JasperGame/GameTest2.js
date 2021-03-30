import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import CalcScores from "../Helpers/CalcScores";

function Game2Test(){

    const scoreContext = useContext(ScoreContext);
    
    
    function calcScores(){
        var newScore = scoreContext.score2+1;
        CalcScores(2,newScore,scoreContext);
    }

    return(
        <div>
            <button
            onClick={calcScores}
            >
                Increment Score 2
            </button>
        </div>
    )
}
export default Game2Test;