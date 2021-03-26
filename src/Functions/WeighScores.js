import { ScoreContext } from "../Contexts/ScoreContext";
import { useContext} from "react";

export function WeighScores(){
    const scoreContext = useContext(ScoreContext);

    var score1 = scoreContext.score1;
    var score2 = scoreContext.score2;
    var score3 = scoreContext.score3;
    var score4 = scoreContext.score4;
    var score5 = scoreContext.score5;

    var scoreArray = [score1,score2,score3,score4,score5];
    console.log(`scoreArray ${scoreArray}`)

    var sorted = scoreArray.slice().sort(function(a,b){return b-a})
    var ranks = scoreArray.slice().map(function(v){ return sorted.indexOf(v)});
    var totalScore = 0;

    for (var i = 0; i < 5; i++){
        let newScore = scoreArray[i]-scoreArray[i]*(ranks[i]*0.2);
        console.log(` weighted score ${i+1}: ${newScore}`);
        console.log("xd");
        totalScore+=newScore;
    }
    // scoreContext.setTotalScore(totalScore);

    console.log(`totalScore: ${totalScore}`)

    console.log(ranks);
}
