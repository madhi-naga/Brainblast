import React, { Component } from 'react'
import ScoreTable from "./ScoreTable"
import "./Leaderboard.css";

export default class Leaderboard extends Component {


    render() {
        return (
            <div className="lead-grid">
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" ></link>
                <div className="grid">
                    <ScoreTable pathlink="top" id="top" title="Top Overall Scores" />
                    <ScoreTable pathlink="recent" id="rec" title="Recent Scores" />
                    <ScoreTable pathlink="top/1" id={1} title="Top Minigame 1 Scores" />
                </div>
                <div className="grid">
                    <ScoreTable pathlink="top/2" id={2} title="Top Minigame 2  Scores" />
                    <ScoreTable pathlink="top/3" id={3} title="Top Minigame 3 Scores" />
                    <ScoreTable pathlink="top/4" id={4} title="Top Minigame 4  Scores" />
                </div>
                <div className="grid">
                    <ScoreTable pathlink="top/5" id={5} title="Top Minigame 5  Scores" />
                </div>

            </div>
        )
    }
}

