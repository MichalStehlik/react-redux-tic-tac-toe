import React from 'react';

// Šablona vhodná pro jednoduché komponnety bez nutnosti udržovat vlastní stav

const FunctionComponent = (props) => { // ekvivalent pro FunctionComponent(props) {
    return (<div className="component-class">Content</div>);
}

export default FunctionComponent;