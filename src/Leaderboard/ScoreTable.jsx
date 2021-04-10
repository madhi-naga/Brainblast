import React, { Component } from 'react';
import axios from 'axios';
const urlBackend = 'https://brainblast-be.herokuapp.com'; 
//const urlBackend = 'http://localhost:8080'

export default class ScoreTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [ ]
        }
    }

    componentDidMount() {
        axios.get(`${urlBackend}/scores/${this.props.pathlink}`)
        .then(res => {
          this.setState({
              list: res.data
          });
          console.log(this.state.list);
        })
        .catch(err => console.log(err));
    }


    render() {
        return (
            <div className="table-bordered">
                <h3>{this.props.title}</h3>
                <table>
                    <thead>
                        <tr>
                            <td className="rank-col">Rank</td>
                            <td className="username-col">Username</td>
                            <td className="score-col">Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list.map((item, i) => { return(
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.username}</td>
                                <td>{item.total_score}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        )
    }
}
