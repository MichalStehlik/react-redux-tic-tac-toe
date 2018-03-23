import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux"; 
import {exampleAction} from "../actions";

class ExampleComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Content
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {data: state.data};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ exampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);