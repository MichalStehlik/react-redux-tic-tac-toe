import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {Pick} from "../actions";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.Pick(this.props.x,this.props.y);
    }

    render() {       
        return (
            <td onClick={this.handleClick} className={this.props.cellMarked ? "marked" : ""}>{this.props.cellValue}</td>
        );
    }
}

function mapStateToProps(state,ownProps) {
    return {
        sequence: state.game.sequence,
        cellValue: state.game.board[ownProps.x][ownProps.y].mark,
        cellMarked: state.game.board[ownProps.x][ownProps.y].marked
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ Pick }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);