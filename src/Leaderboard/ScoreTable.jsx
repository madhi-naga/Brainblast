import React, { Component } from 'react';
import axios from 'axios';
import "./Leaderboard.css";
const urlBackend = 'https://brainblast-be.herokuapp.com';

//const urlBackend = 'http://localhost:8080'

export default class ScoreTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    modifyData = (data) => {
        var parsedata = [];
        var i;
        switch(this.props.id) {
            case 1:
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].minigame_scores.minigame_1});
                }
                return parsedata;
            case 2:
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].minigame_scores.minigame_2});
                }
                return parsedata;
            case 3:
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].minigame_scores.minigame_3});
                }
                return parsedata;
            case 4:
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].minigame_scores.minigame_4});
                }
                return parsedata;
            case 5:
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].minigame_scores.minigame_5});
                }
                return parsedata;
            default: 
                parsedata = [];
                for(i in data) {
                    parsedata.push({name: data[i].username, score: data[i].total_score});
                }
                return parsedata;
        }
    }

    componentDidMount() {
        axios.get(`${urlBackend}/scores/${this.props.pathlink}`)
            .then(res => {
                this.setState({
                    list: this.modifyData(res.data)
                });
                //console.log(this.state.list);
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div className="table-bordered">
                <h3 className="lead-header">{this.props.title}</h3>
                <table>
                    <thead>
                        <tr>
                            <td className="rank-col">Rank</td>
                            <td className="username-col">Username</td>
                            <td className="score-col">Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
