import React, { Component } from 'react'
import { ScoreContext } from '../Contexts/ScoreContext'
import "./ReverseWord.css"
import CalcScores from "../Helpers/CalcScores";

const randomWords = require('random-words');
const t = 4;

export default class ReverseWord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentword: "",
            seconds: t,
            isStarted: false,
        };
        this.timer = 0;
        this.handleEnter = this.handleEnter.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.handleExit = this.handleExit.bind(this);
    }

    static contextType = ScoreContext;
    componentDidMount() {
        this.setState({ currentword: randomWords(1)[0] });
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
        this.context.setScore2(0);
        this.setRandomWord();

        let timeLeftVar = this.secondsToTime(t);
        this.setState({ seconds: t, time: timeLeftVar });
        this.timer = setInterval(this.countDown, 1000);
        this.setState({ isStarted: true })
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
            clearInterval(this.timer);
            this.setState({ isEnded: true });
        }
    }

    calcScores = () => {
        CalcScores(2, this.context.score2, this.context);
    }

    handleEnter = (e) => {
        var score = this.context.score2
        if (e.key === 'Enter') {
            e.preventDefault();

            if (document.getElementById('guess').value === this.reverse(this.state.currentword)) {
                let len = document.getElementById('guess').value.length;
                this.context.setScore2(score + len);
            }

            this.setRandomWord();
            document.getElementById('guess').value = '';
        }
    }

    handleExit() {
        this.props.history.push('/menu');
        this.calcScores();
    }

    render() {
        return (
            <div>
                <h1>Reverse Word</h1>
                <h4>Reverse as many words as possible before the timer ends. Click Enter to submit each answer.
                Red words count for double points!
                </h4>
                Seconds: {this.state.seconds}
                {this.state.isStarted ? null : <button onClick={this.startTimer}>Start</button>}

                <div className="dashboard"> 
                {
                    this.state.isStarted && this.state.seconds > 0 ?
                        <div>
                            <h3 className="display-word">{this.state.currentword}</h3>
                            <form action="">
                                <input
                                    type="text"
                                    id="guess"
                                    placeholder="Enter the Reverse Word"
                                    onKeyPress={this.handleEnter}
                                />
                            </form>
                            <h3>Current Score: {this.context.score2}</h3>
                        </div>
                        : null
                }
                {
                    this.state.seconds === 0 ?
                        <div className="exit-options">
                            <h3>Current Score: </h3>
                            <button onClick={this.startTimer}>Try Again</button>
                            <button onClick={this.handleExit}>Submit Score & Exit</button>
                        </div>
                        : null
                }
                </div>

            </div>
        )
    }
}
