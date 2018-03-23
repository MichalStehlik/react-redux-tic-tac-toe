import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {Init} from "../actions";
import { X_WON, O_WON, IN_PROGRESS, STALEMATE, READY, X, O} from "../utilities/gameHelpers";

class GameState extends Component {
    constructor(props) {
        super(props);
        this.handleClickSimple = this.handleClickSimple.bind(this);
        this.handleClickMedium = this.handleClickMedium.bind(this);
        this.handleClickEpic = this.handleClickEpic.bind(this);
    }

    handleClickSimple(event) {
        this.props.Init(3,3,3);
    }

    handleClickMedium(event) {
        this.props.Init(20,10,4);
    }

    handleClickEpic(event) {
        this.props.Init(60,30,5);
    }

    renderMessage(status) {
        switch (status) {
            case X_WON: return <span className="navbar-text text-success mx-3"><strong>{X}</strong> has won</span>;
            case O_WON: return <span className="navbar-text text-success mx-3"><strong>{O}</strong> has won</span>;
            case IN_PROGRESS: return <span className="navbar-text text-info mx-3">Game is in progress</span>;
            case READY: return <span className="navbar-text mx-3">Select difficulty</span>;
            case STALEMATE: return <span className="navbar-text text-danger mx-3">Game cannot be finished</span>;
            default: return "";
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <span className="navbar-brand">Tic-tac-toe</span>
                <span className="navbar-text mx-3">Turn of <strong>{this.props.mark}</strong></span>
                <span className="navbar-text mx-3">Sequence of <strong>{this.props.winLength}</strong> cells</span>               
                    <span className="btn-group">
                    <button 
                        className="btn btn-secondary" 
                        onClick={this.handleClickSimple}
                        >Classic</button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={this.handleClickMedium}
                        >Normal</button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={this.handleClickEpic}
                        >Epic</button>
                    </span>   
                <div>
                    {this.renderMessage(this.props.status)}
                </div>    
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        board: state.game.board,
        mark: state.game.mark,
        winLength: state.game.winSequenceLength,
        status: state.game.status
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ Init }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameState);