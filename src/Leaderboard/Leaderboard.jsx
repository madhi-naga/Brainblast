import React, { Component } from 'react'
import ScoreTable from "./ScoreTable"

export default class Leaderboard extends Component {


    render() {
        return (
            <div className="lead-grid">
                <div className="grid-1">
                    <ScoreTable pathlink="top" id="top" title="Top Overall Scores" />
                    <ScoreTable pathlink="recent" id="rec" title="Recent Scores" />
                    <ScoreTable pathlink="top/1" id="mini1" title="Top Minigame 1 Scores" />
                    <ScoreTable pathlink="top/2" id="mini2" title="Top Minigame 2  Scores" />
                </div>
                <div className="grid-2">
                    <ScoreTable pathlink="top/3" id="mini3" title="Top Minigame 3 Scores" />
                    <ScoreTable pathlink="top/4" id="mini4" title="Top Minigame 4  Scores" />
                    <ScoreTable pathlink="top/5" id="mini5" title="Top Minigame 5  Scores" />
                </div>
                
            </div>
        )
    }
}

