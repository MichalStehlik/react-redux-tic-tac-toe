export const X = "X";
export const O = "O";
export const EMPTY = " ";
export const X_WON = "X_WON";
export const O_WON = "O_WON";
export const IN_PROGRESS = "RUNNING";
export const STALEMATE = "FULL";
export const READY = "READY";

const WE = [
    [0, 1],
    [0, -1]
];
const NS = [
    [1, 0],
    [-1, 0]
];
const SE = [
    [1, 1],
    [-1, -1]
];
const NW = [
    [1, -1],
    [-1, 1]
];

/**
 * @desc kontroluje a vraci bunky se stejnou znackou podel vektoru od aktualniho tahu danym smerem
 * @param array {board} - kontrolovana herni plocha
 * @param int {lastX} - souradnice x posledniho tahu
 * @param int {lastY} - souradnice y posledniho tahu
 * @param int {shiftX} - posun ve smeru x
 * @param int {shiftY} - posun ve smeru y
 * @param int {winSequenceLength} - delka vitezne sekvence
 * @return array - prvky sekvence
 */
function getSequenceInVector(board, lastX, lastY, shiftX, shiftY, winSequenceLength) {
    let mark = board[lastX][lastY].mark;
    let sizeX = board.length;
    let sizeY = board[0].length;
    let content = [];
    var x = lastX;
    var y = lastY;
    while ((x >= 0) && (y >= 0) && (x < sizeX) && (y < sizeY) && (board[x][y].mark === mark)) {
        if ((x !== lastX) || (y !== lastY)) content.push([x, y]);
        x += shiftX;
        y += shiftY;
    }
    return content;
}

/**
 * @desc kombinuje sekvence na kontrolovane herni plose ve smeru opacnych vektoru
 * @param array {board} - kontrolovana herni plocha
 * @param int {lastX} - souradnice x posledniho tahu
 * @param int {lastY} - souradnice y posledniho tahu
 * @param array {direction} - definice smeru (shifX a shiftY)
 * @param int {winSequenceLength} - delka vitezne sekvence
 * @return array - prvky sekvence
 */
function getSequenceInDirection(board, lastX, lastY, direction, winSequenceLength) {
    let t1 = getSequenceInVector(board, lastX, lastY, direction[0][0], direction[0][1], winSequenceLength);
    let t2 = getSequenceInVector(board, lastX, lastY, direction[1][0], direction[1][1], winSequenceLength);
    return [...new Set([
        [lastX, lastY], ...t1, ...t2
    ])];
}

/**
 * @desc vraci uplnou vyherni sekvenci nebo false (pokud nikdo nevyhral)
 * @param array {board} - kontrolovana herni plocha
 * @param int {lastX} - souradnice x posledniho tahu
 * @param int {lastY} - souradnice y posledniho tahu
 * @param int {winSequenceLength} - delka vitezne sekvence
 * @return array/false
 */
function getVictoriousSequence(board, lastX, lastY, winSequenceLength) {
    let directions = [WE, NS, SE, NW];
    for (let direction of directions) {
        let r = getSequenceInDirection(board, lastX, lastY, direction, winSequenceLength);
        if (r.length >= winSequenceLength)
            return r;
    }
    return false;
}

/**
 * @desc overuje stav herni plochy
 * @param array {board} - kontrolovana herni plocha
 * @param int {lastX} - souradnice x posledniho tahu
 * @param int {lastY} - souradnice y posledniho tahu
 * @param int {winSequenceLength} - delka vitezne sekvence
 * @return object - {string status, array winningSequence}
 */
export function checkStatus(board, lastX, lastY, winSequenceLength) {
    let r = getVictoriousSequence(board, lastX, lastY, winSequenceLength);
    if (r) {
        if (board[lastX][lastY].mark === X)
            return { status: X_WON, sequence: r };
        else
            return { status: O_WON, sequence: r };
    }

    for (let i = 0; i < board.length; i++)
        for (let j = 0; j < board[0].length; j++)
            if (board[i][j].mark === EMPTY)
                return { status: IN_PROGRESS, sequence: [] };
    return { status: STALEMATE, sequence: [] };
}