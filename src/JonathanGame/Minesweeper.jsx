import React from 'react';
import Board from './Board';
import './Minesweeper.css'

class Minesweeper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 8,
            width: 8,
            mines: 10
        };
    }

    render() {
        const { height, width, mines } = this.state;

        return (
            <div className="game">
                <Board height={height} width={width} mines={mines} username={this.props.location.username} history={this.props.history}/>
            </div>
        );
    }
}
export default Minesweeper;
