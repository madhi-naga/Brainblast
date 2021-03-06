import React, { Component } from 'react'
import { ScoreContext } from '../Contexts/ScoreContext'
import "./ReverseWord.css"
import CalcScores from "../Helpers/CalcScores";
import axios from 'axios';

const urlBackend = 'https://brainblast-be.herokuapp.com';
const randomWords = require('random-words');
const t = 25;

export default class ReverseWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentword: "",
            seconds: t,
            isStarted: false,
            currScore: 0,
            bestScore: 0
        };
        this.timer = 0;
        this.handleEnter = this.handleEnter.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleExit = this.handleExit.bind(this);
        this.handleCleanExit = this.handleCleanExit.bind(this);
    }

    static contextType = ScoreContext;

    componentDidMount() {
        this.setState({ currentword: randomWords(1)[0], bestScore: this.context.score2 });
        let timeLeftVar = this.secondsToTime(t);
        this.setState({ time: timeLeftVar });
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    setRandomWord() {
        this.setState({ currentword: randomWords(1)[0] })
    }

    reverse = (s) => {
        return s.split("").reverse().join("");
    }

    startTimer() {
        this.setRandomWord();

        let timeLeftVar = this.secondsToTime(t);
        this.setState({ seconds: t, time: timeLeftVar, isStarted: true, currScore: 0 });
        this.timer = setInterval(this.countDown, 1000);
    }


    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            var curr = this.state.currScore;
            clearInterval(this.timer);
            if(curr > this.state.bestScore){
                this.setState({ bestScore: curr, isEnded: true });
            }
            else
                this.setState({ isEnded: true });
        }
    }

    calcScores = () => {
        CalcScores(2, this.state.bestScore, this.context);
    }

    handleEnter = (e) => {
        var score = this.state.currScore;
        if (e.key === 'Enter') {
            e.preventDefault();

            if (document.getElementById('guess').value === this.reverse(this.state.currentword)) {
                let len = document.getElementById('guess').value.length;
                if (len > 7) len += 5;
                this.setState({currScore: score + len});
            }

            this.setRandomWord();
            document.getElementById('guess').value = '';
        }
    }

    handleExit() {
        this.props.history.push('/menu');
        this.calcScores();
        this.context.setScore2(this.state.bestScore); 

        var params = {
            username: this.props.location.username,
            minigame_scores: {
                minigame_2: this.state.bestScore
            }
        }

        axios.post(`${urlBackend}/score/update`, params)
          .then( resp => alert("Updated Score"))
          .catch(error => console.log(error));
    }

    handleCleanExit() {
        this.props.history.push('/menu');
    }

    wordcolor(){ 
        if (this.state.currentword.length > 7)
            return "#e33636"
        else return "#000";
    }

    timecolor(){ 
        if (this.state.seconds <= 10)
            return "#e33636"
        else return "#000";
    }


    render() {
        return (
            <div className="game2">
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" ></link>
                <div className="game-header">
                    <h1>Word Reverse</h1>
                    <h4>Reverse as many words as possible before the timer ends. Click Enter to submit each answer.
                    Red words add bonus points!</h4>
                    <h3 className="display-time" style={{color: this.timecolor() }} >Time Left: {this.state.seconds}</h3>
                    {this.state.isStarted ? null : <button className="btn btn-dark start" onClick={this.startTimer}>Start</button>}
                </div>
                <div className="dashboard">
                    {
                        this.state.isStarted && this.state.seconds > 0 ?
                            <div>
                                <h3 className="display-word" style={{color: this.wordcolor() }}>{this.state.currentword}</h3>
                                <form action="">
                                    <input
                                        type="text"
                                        id="guess"
                                        placeholder="Enter the Reverse Word"
                                        onKeyPress={this.handleEnter}
                                    />
                                </form>
                            </div>
                            : null
                    }
                    {
                        this.state.seconds === 0 ?
                            <div className="exit-options">
                                <button className="btn btn-dark" onClick={this.startTimer}>Try Again</button>
                                <button className="btn btn-dark" onClick={this.handleExit}>Submit Score & Exit</button>
                                <button className="btn btn-dark" onClick={this.handleCleanExit}>Exit Without Saving</button>
                            </div>
                            : null
                    }
                </div>
                <h3 className="score-header">Current Score: {this.state.currScore}</h3>
                <h3 className="best-header">Best Score: {this.state.bestScore}</h3>
            </div>
        )
    }
}
