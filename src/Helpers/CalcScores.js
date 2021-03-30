
function CalcScores(gameID,score,scoreContext){
    
    const unique = [];
    function repeated(rank){
        if (unique.includes(rank)){
            return repeated(rank+1);
        }
        else{
            unique.push(rank);
            return rank;
        }
    }
    var score1 = scoreContext.score1;
    var score2 = scoreContext.score2;
    var score3 = scoreContext.score3;
    var score4 = scoreContext.score4;
    var score5 = scoreContext.score5;

    switch(gameID){
        case 1:
            score1=score;
            scoreContext.setScore1(score1);
            break;
        case 2:
            score2=score;
            scoreContext.setScore2(score2);
            break;

        case 3:
            score3=score;
            scoreContext.setScore3(score3);
            break;
        case 4:
            score4=score;
            scoreContext.setScore4(score4);
            break;
        case 5:
            score5=score;
            scoreContext.setScore5(score5);
            break;
        default:
            break;
    }


    var scoreArray = [score1,score2,score3,score4,score5];

    var sorted = scoreArray.slice().sort(function(a,b){return b-a})
    var ranks = scoreArray.slice().map(function(v){return repeated(sorted.indexOf(v))});
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

export default CalcScores;