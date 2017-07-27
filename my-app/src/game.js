import React from 'react';
import Board from './board';
import calculateWinner from './helpers/calculateWinner';

export default class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            test: 'test',
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0
        };
    }

    handleClick(i) {
        const {xIsNext, history} = this.state;

        //console.log(history);


        const current = history[history.length - 1];

        //console.log(history);
       //console.log(current);
        const squares = current.squares.slice();


        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O'; // запись в массив 0-8

        this.setState({

            history: history.concat([{squares}]),
            xIsNext: !xIsNext,
            stepNumber: ++this.state.stepNumber
        });
    }

    change() {
        console.log('test');
        const change = (this.state.test ==='test') ? 'success' : 'test';
        this.setState({
            test: change
        });
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) ? false : true
        });
    }

    renderMoves() {
        return this.state.history.map((step, move) => {
            console.log(step, move);
            const desc = move ? 'Move #' + move : 'Start Game';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)} >{desc}</a>
                </li>
            );
        });
    }
    render(){
        const {xIsNext, history, stepNumber} = this.state;
        const current = history[stepNumber];

        const winner = calculateWinner(current.squares);

       // console.log(winner);
        let status;
        if (winner) {
            status = 'Winner is: ' + winner;
        } else {
            status = 'Next player is: ' + (xIsNext ? 'X' : 'O');
        }


       // console.log(current.squares);
        return(

            <div className="game">
                <div className="game-board">
                    <Board
                        teststate = {this.state.test}
                        squares={current.squares}
                        onClick = {(i)=>this.handleClick(i)}
                    />
                </div>
                <div onClick ={()=>this.change()}>{this.state.test}</div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.renderMoves()}</ol>
                </div>
            </div>
            )
        }
    }
