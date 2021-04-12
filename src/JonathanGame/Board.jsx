import React from 'react';
import Cell from './Cell';
import { ScoreContext } from '../Contexts/ScoreContext'
import CalcScores from "../Helpers/CalcScores";
import { Link } from "react-router-dom";
import axios from 'axios';

const urlBackend = 'https://brainblast-be.herokuapp.com';

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boardData: this.initBoard(this.props.height, this.props.width, this.props.mines),
            gameOver: false,
            mineCount: this.props.mines,
            score: 0
        };
    }

    static contextType = ScoreContext;

    componentDidMount() {
        this.setState({
            bestScore: this.context.score1
        });
    }

    initBoard(height, width, mines) {
        var board = [];
        for (var i = 0; i < height; i++) {
            board.push([]);
            for (var j = 0; j < width; j++) {
                board[i][j] = {
                    x: i,
                    y: j,
                    neighbours: 0,
                    empty: false,
                    mine: false,
                    flagged: false,
                    revealed: false
                };
            }
        }
        board = this.placeMines(board, height, width, mines);
        board = this.getNeighbours(board, height, width);

        if (!board[0][0].empty) {
            return this.initBoard(height, width, mines);
        }
        return board;
    }


    //Places the mines randomly across the board
    //Mines cannot be placed in the top left in order to give a safe starting location
    placeMines(board, height, width, mines) {
        var randX, randY, minesPlaced = 0;
        while (minesPlaced < mines) {
            randX = Math.floor(Math.random() * width);
            randY = Math.floor(Math.random() * height);

            //Place a mine in random cell
            if (!(board[randX][randY].mine)) {
                minesPlaced++;
                board[randX][randY].mine = true;
            }
        }
        return board;
    }

    //Generates the number on the cell by counting neighbouring mines
    getNeighbours(board, height, width) {
        var newBoard = board;

        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                if (!board[i][j].mine) {
                    let neighbourMines = 0;
                    var x = board[i][j].x;
                    var y = board[i][j].y;

                    const area = this.traverseNeighbours(x, y, board);

                    area.forEach(neighbour => {
                        if (neighbour.mine) {
                            neighbourMines++;
                        }
                    })

                    if (neighbourMines === 0) {
                        newBoard[i][j].empty = true;
                    }
                    newBoard[i][j].neighbours = neighbourMines;
                }
            }
        }

        return newBoard;
    }

    //Generates a list of neighbouring cells
    traverseNeighbours(x, y, board) {
        const area = [];

        //Left
        if (x > 0) {
            area.push(board[x - 1][y]);
        }
        //Right
        if (x < this.props.width - 1) {
            area.push(board[x + 1][y]);
        }
        //Up
        if (y > 0) {
            area.push(board[x][y - 1]);
        }
        //Down
        if (y < this.props.height - 1) {
            area.push(board[x][y + 1]);
        }
        //Left and up
        if (x > 0 && y > 0) {
            area.push(board[x - 1][y - 1])
        }
        //Right and up
        if (x < this.props.width - 1 && y > 0) {
            area.push(board[x + 1][y - 1])
        }
        //Left and down
        if (x > 0 && y < this.props.height - 1) {
            area.push(board[x - 1][y + 1])
        }
        //Right and down
        if (x < this.props.width - 1&& y < this.props.height - 1) {
            area.push(board[x + 1][y + 1])
        }
        return area;
    }

    //Reveals the entire board
    revealBoard() {
        var updatedBoard = this.state.boardData;
        for (var i = 0; i < this.props.width; i++) {
            for (var j = 0; j < this.props.height; j++) {
                updatedBoard[i][j].revealed = true;
            }
        }

        this.setState({
            boardData: updatedBoard
        }, () => {
            this.context.setScore1(this.state.score);
        });
    }

    //Reveals the cell and any connected cells that should be revealed
    revealEmpty(x, y, board) {
        var score = 0;
        var area = this.traverseNeighbours(x, y, board);
        for (var i = 0; i < area.length; i++) {
            //Not flagged, revealed, or a mine
            if (!area[i].flagged && !area[i].revealed && !area[i].mine) {
                //Reveal cell
                board[area[i].x][area[i].y].revealed = true;
                if (area[i].empty) {
                    //Reveal surrounding squares
                    this.revealEmpty(area[i].x, area[i].y, board);
                }
                score++;
            }
        }
        this.setState(prevState => ({ score: prevState.score + score}))
        return board;
    }

    getHidden(board) {
        var hidden = [];
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (!board[i][j].revealed) {
                    hidden.push([i][j]);
                }
            }
        }
        return hidden;
    }

    getMines(board) {
        var mines = [];
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j].mine) {
                    mines.push([i, j]);
                }
            }
        }
        return mines;
    }

    getFlags(board) {
        var flags = [];
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {
                if (board[i][j].flagged) {
                    flags.push([i, j]);
                }
            }
        }
        return flags;
    }

    //Calculates the players score based on the number of flags successfully marked with a flag
    getFlagScore() {
        const board = this.state.boardData;
        const mines = this.getMines(board);
        const flags = this.getFlags(board);
        var correct = 0, score = 0;

        mines.forEach(mine => {
            flags.forEach(flag => {
                if (mine[0] === flag[0] && mine[1] === flag[1]) correct++;
            });
        });

        //Earlier flags are worth more points
        for (var i = 1; i <= correct; i++) {
            if (i === 1) score += 6;
            else if (i <= 6) score += 5;
            else if (i <= 10) score += 4;
        }

        return score;
    }

    //Left click on cell
    handleCellClick(x, y) {
        if (this.state.boardData[x][y].revealed || this.state.boardData[x][y].flagged) {
            return null;
        }

        if (this.state.boardData[x][y].mine) {
            var totalScore = this.state.score + this.getFlagScore();

            this.setState({
                gameOver: "You lose.",
                score: totalScore

            });
            this.revealBoard()
        }
        else {
            this.setState(prevState => ({ score: prevState.score + 1}))
        }

        var updatedBoard = this.state.boardData;
        updatedBoard[x][y].flagged = false;
        updatedBoard[x][y].revealed = true;

        if (updatedBoard[x][y].empty) {
            updatedBoard = this.revealEmpty(x, y, updatedBoard);
        }

        if (this.getHidden(updatedBoard).length === this.props.mines) {
            this.setState({
                gameOver: "You win.",
                score: 100
            });
            this.revealBoard();
        }

        this.setState({
            boardData: updatedBoard,
            mineCount: this.props.mines - this.getFlags(updatedBoard).length
        })
    }

    //Right click on cell
    handleRightClick(e, x, y) {
        //Stops the right-click menu from appearing
        e.preventDefault();

        //If cell already revealed, do nothing
        if (this.state.boardData[x][y].revealed) {
            return;
        }

        var mines = this.state.mineCount;
        var updatedBoard = this.state.boardData;

        //Flag cell
        if (this.state.boardData[x][y].flagged) {
            updatedBoard[x][y].flagged = false;
            mines++;
        }
        else { //Remove flag
            updatedBoard[x][y].flagged = true;
            mines--;
        }

        //Check if all mines are flagged
        if (mines === 0) {
            const mineArr = this.getMines(updatedBoard);
            const flagArr = this.getFlags(updatedBoard);
            var notEqual = false;
            for (var i = 0; i < mineArr.length; i++) {
                for (var j = 0; j < mineArr[0].length; j++) {
                    if (mineArr[i][j] !== flagArr[i][j]) {
                        notEqual = true;
                    }
                }
            }
            if (!notEqual) {
                this.setState({
                    gameOver: "You win.",
                    score: 100
                });
                this.revealBoard();
            }
        }

        this.setState({
            boardData: updatedBoard,
            mineCount: mines
        })
    }

    restart() {
        this.setState({
            boardData: this.initBoard(this.props.height, this.props.width, this.props.mines),
            gameOver: false,
            mineCount: this.props.mines,
            score: 0
        });
    }

    calcScores = () => {
        let subScore = this.state.score > this.state.bestScore ? this.state.score : this.state.bestScore;
        CalcScores(1, subScore, this.context);
    }

    handleExit() {
        let subScore = this.state.score > this.state.bestScore ? this.state.score : this.state.bestScore;
        this.calcScores();

        var params = {
            username: this.props.username,
            minigame_scores: {
                minigame_1: subScore
            }
        }

        axios.post(`${urlBackend}/score/update`, params)
            .then( resp => alert("Updated Score"))
            .catch(error => console.log(error));
    }

    renderBoard(board) {
        return board.map((row) => {
            return row.map((cell) => {
                return (
                    <div key={cell.x * row.length + cell.y}>
                        <Cell
                            onClick={() => this.handleCellClick(cell.x, cell.y)}
                            cMenu={(e) => this.handleRightClick(e, cell.x, cell.y)}
                            value={cell}
                        />
                    {(row[row.length - 1] === cell) ? <div className="clear" /> : ""}
                    </div>
                );
            })
        });

    }

    render() {
        return (
            <div>
                <div className="board">
                    <h1 className="info">
                        Minesweeper
                    </h1>
                    <span className="info">
                        Current Score: {this.state.score}
                    </span>
                    <span className="info">
                        Best Score: {this.state.bestScore}
                    </span>
                    <br/>
                    {
                        !this.state.gameOver &&
                        <span className="info">
                            Mines: {this.state.mineCount}
                        </span>
                    }
                    {
                        this.state.gameOver &&
                        <span className="info">
                            {this.state.gameOver}
                        </span>
                    }

                { this.renderBoard(this.state.boardData) }
            </div>
                { this.state.gameOver &&
                    <div>
                        <button className="btn btn-dark" onClick={() => this.restart()}>Try Again</button>
                        <Link to={"/menu"} role="button" id="goMenu" className="btn btn-dark">Exit Without Saving</Link>
                        <Link to={"/menu"} onClick={() => this.handleExit()} role="button" id="goMenu" className="btn btn-dark">Submit Score & Exit</Link>
                    </div>
                }
            </div>
        );
    }
}
export default Board;
