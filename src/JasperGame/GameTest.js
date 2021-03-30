import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";

function GameTest(){
    const scoreContext = useContext(ScoreContext);
    
    function calcScores(){
        scoreContext.setScore1(scoreContext.score1+1);
        var scoreArray = [scoreContext.score1,scoreContext.score2,scoreContext.score3,scoreContext.score4,scoreContext.score5];

        var sorted = scoreArray.slice().sort(function(a,b){return b-a})
        var ranks = scoreArray.slice().map(function(v){ return sorted.indexOf(v)});
        var totalScore = 0;

        for (var i = 0; i < 5; i++){
            var newScore = Math.round((scoreArray[i]-scoreArray[i]*(ranks[i]*0.2))*10)/10;
            totalScore+=newScore;
            switch(i){
                case 0:
                    scoreContext.setWeightedScore1(newScore);
                    break;
                case 1:
                    scoreContext.setWeightedScore2(newScore);
                    break;

                case 2:
                    scoreContext.setWeightedScore3(newScore);
                    break;
                case 3:
                    scoreContext.setWeightedScore4(newScore);
                    break;
                case 4:
                    scoreContext.setWeightedScore5(newScore);
                    break;
                default:
                    break;
            }
        }
        scoreContext.setTotalScore(totalScore);   
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