import React, { useState, useEffect} from "react";
import { useContext} from "react";
import {ScoreContext} from "../Contexts/ScoreContext";
import CalcScores from "../Helpers/CalcScores";
import { Link } from "react-router-dom";
import "./MemoryGame.css";

function MemoryGame(){

    const [seen,setSeen] = useState(new Set());
    const [currScore,setCurrScore] = useState(0);
    const [words,setWords] = useState([]);
    const [lives,setLives] = useState(3);
    const [string,setString] = useState(null);
    const [previous,setPrevious] = useState(null);
    const [reset,setReset] = useState(0);
    const scoreContext = useContext(ScoreContext);
    var randomWords = require('random-words');

    useEffect(() => {
        setSeen(new Set());
        setCurrScore(0);
        setPrevious(null);
        setWords(randomWords(50));
        setLives(3);
        setString(random());
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [reset]);

    useEffect(()=>{
        if(lives === 0)
            calcScores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[lives])

    function random(){
        var rand = Math.random();
        if (rand < 0.55 && seen.size > 1){ //random element from seen
            var randElem = getRandomItem(seen);
            while (String(randElem)===String(previous)){
                randElem = getRandomItem(seen);
            }
            setPrevious(randElem);
            return randElem;
        }
        else{
            if (0.55 <= rand && rand < 0.725){
                if (words.length === 0){
                    setReset(reset+1);
                }
                var randWord = words[Math.floor(Math.random() * words.length)];
                while (String(randWord)===String(previous)){
                    randWord = words[Math.floor(Math.random() * words.length)];
                }
                setPrevious(randWord);
                return randWord;
            }
            else{ 
                var randNum = generateNum();
                while (String(randNum)===String(previous)){
                    randNum = generateNum();
                }
                setPrevious(randNum);
                return randNum;
            }
        }
        
    }

    function getRandomItem(set) {
        let items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }

    function generateNum(){
        return Math.floor(Math.random() * 50); 
    }

    function calcScores(){
        var newScore = currScore;
        CalcScores(3,newScore,scoreContext);
    }

    function onClickNew(){
        if(!seen.has(string)){
            setCurrScore(currScore+1);
            setSeen(prev => new Set(prev.add(string)));
        }
        else{
            setLives(lives-1);
        }
        setString(random());
    }

    function onClickSeen(){
        if(seen.has(string)){
            setCurrScore(currScore+1);
        }
        else{
            setLives(lives-1);
            setSeen(prev => new Set(prev.add(string)));
        }
        setString(random());
    }

    function onClickReset(){
        setReset(reset+1);
    }
    if (lives > 0){
        return(
            <div id="MemoryGameDisplay">
                <link
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                        rel="stylesheet"
                    ></link>
                <h1 id ="generated">{string}</h1>
                <div className ="buttonContainer">
                    <button className ="btn btn-dark" onClick={onClickSeen}>Seen</button>
                    <button className ="btn btn-dark" onClick={onClickNew}>New</button>
                </div>
                <h1 id ="currScore">Current Score: {currScore}</h1>
                <h1 id ="lives">Lives Remaining: {lives}</h1>
            </div>
        )
    }
    else{
        return(
            <div>
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
                <link
                        href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap"
                        rel="stylesheet"
                    ></link>
                <h1 id ="game3Header">Game Over</h1>
                <h1 id ="endScore">Your Score: {currScore}</h1>
                <div className ="buttonContainerOver">
                    <button className ="btn btn-dark" onClick={onClickReset}>Play again</button>
                    <Link to={"/menu"} role="button" id="goMenu" className="btn btn-dark">Return to Menu </Link>
                </div>
            </div>
        )
    }
}

export default MemoryGame;