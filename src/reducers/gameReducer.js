import { PICK, INIT } from "../actions";
import { X, O, EMPTY, IN_PROGRESS, READY, checkStatus } from "../utilities/gameHelpers";

const INITIAL_STATE = { board: [], mark: X, winSequenceLength: 0, status: READY, sequence: [] };

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PICK:
            let newBoard = [...state.board];
            let mark = state.mark;
            let newStatus = state.status;
            // pokud je policko prazdne a hra probiha
            if ((newBoard[action.payload.x][action.payload.y].mark === EMPTY) && (state.status === IN_PROGRESS)) {
                newBoard[action.payload.x][action.payload.y].mark = mark;
                // vyhodnoceni stavu herni plochy
                let newResult = checkStatus(newBoard, action.payload.x, action.payload.y, state.winSequenceLength);
                newStatus = newResult.status;
                // oznaceni vitezneho tahu
                let winningSequence = newResult.sequence;
                if (winningSequence.length > 0) {
                    newResult.sequence.forEach((cell) => {
                        newBoard[cell[0]][cell[1]].marked = true;
                    });
                }
                // prepnuti na dalsiho hrace
                if (mark === X) mark = O;
                else mark = X;
            }
            return {...state, board: newBoard, mark: mark, status: newStatus };
        case INIT:
            var board = [];
            for (var i = 0; i < action.payload.height; i++) {
                board[i] = [];
                for (var j = 0; j < action.payload.width; j++) {
                    board[i][j] = { mark: EMPTY, marked: false };
                }
            }
            return { board: board, mark: X, winSequenceLength: action.payload.winSequenceLength, status: IN_PROGRESS, sequence: [] };
        default:
            return state;
    }
}