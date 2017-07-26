import React from 'react';
import Board from './board';

export default class Game extends React.Component {

    constructor(){
        super();
        this.state = {
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0
        };
    }

    handleClick(i) {
        console.log('handleClick', i);
    }

    render() {
        const {xIsNext, history, stepNumber} = this.state;

        //const xIsNext = this.state.xIsNext;

        const current = history[stepNumber];

        const status = 'Next player is: ' + (xIsNext ? 'X' : 'O');


        return(
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick = {(i)=>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{/*history*/}</ul>
                </div>
            </div>
            )
        }
    }
