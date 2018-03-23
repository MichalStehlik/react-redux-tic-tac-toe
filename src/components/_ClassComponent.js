import React, { Component } from 'react';

// Šablona vhodná pro složitější komponenty, které musí udržovat svůj stav, je nutné je inicializovat nebo obsahují další metody

class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this); // přebindování "this" pro použití v handleClick
        this.state = {};
    }

    onClick(event) { // obsluha kliknutí na tuto komponentu
        console.log(event.target.value);
    }
    
    render() {
        return (
            <div 
                className="component-class" 
                onClick={this.onClick}>
            Content
            </div>
        );
    }
}

export default ClassComponent;
