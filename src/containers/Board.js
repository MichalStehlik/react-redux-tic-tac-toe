import React, { Component } from 'react';
import {connect} from "react-redux";
import Cell from "./Cell";

class Board extends Component {

    render() {     
        return (
            <div className="game-board-container">
                <table className="board">
                    <tbody>
                    {this.props.board.map(
                        (row,rowNumber) => {
                            return <tr key={rowNumber}>{row.map(
                                (cell,colNumber) => {
                                    return <Cell key={colNumber} x={rowNumber} y={colNumber}/>
                                }
                            )}</tr>
                        })
                    }
                    </tbody>
                </table>    
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {board: state.game.board};
}

export default connect(mapStateToProps, null)(Board);