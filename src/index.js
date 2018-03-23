import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import './index.css';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';

import GameState from "./containers/GameState";
import Board from "./containers/Board";

const createStoreWithMiddleware = applyMiddleware()(createStore);
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}> 
        <div>
            <GameState/>
            <Board />
        </div>
    </Provider>,
    document.getElementById('root'));
