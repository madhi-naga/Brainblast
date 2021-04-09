import React, { Component } from 'react'
import {ScoreContext} from "../Contexts/ScoreContext";
import "./ReverseWord.css"

const randomWords = require('random-words');

export default class ReverseWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentword: "",
            timer: 30
        };
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentDidMount() {
        this.setState({ currentword: randomWords(1)[0] });
    }

    setRandomWord() {
        this.setState({ currentword: randomWords(1)[0] })
    }
    
    reverse = (s) => {
        return s.split("").reverse().join("");
    }

    handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            if(document.getElementById('guess').value == this.reverse(this.state.currentword)){
                
            }

            this.setRandomWord();
            document.getElementById('guess').value = '';
        }
    }

    render() {
        return (
            <div>
                <h1>Reverse Word</h1>
                <div className="dashboard">
                    <h2 className="display-word">{this.state.currentword}</h2>
                    <form action="">
                        <input
                            type="text"
                            id="guess"
                            placeholder="Enter the Reverse Word"
                            onKeyPress={this.handleEnter}
                        />
                    </form>
                </div>
            </div>
        )
    }
}
