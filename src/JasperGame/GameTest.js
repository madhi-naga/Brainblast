import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";

function GameTest(){
    const scoreContext = useContext(ScoreContext);
    
    function calcScores(){
        //need to incremenet the score twice within the function bc for some reason the context doesn't update until you exit component
        var score1 = scoreContext.score1 + 1;
        var score2 = scoreContext.score2;
        var score3 = scoreContext.score3;
        var score4 = scoreContext.score4;
        var score5 = scoreContext.score5;

        var scoreArray = [score1,score2,score3,score4,score5];

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
        scoreContext.setScore1(scoreContext.score1+1);
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