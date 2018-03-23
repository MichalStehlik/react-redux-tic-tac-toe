import { combineReducers } from 'redux';
import GameReducer from "./gameReducer";

const rootReducer = combineReducers({
    game: GameReducer
});

export default rootReducer;