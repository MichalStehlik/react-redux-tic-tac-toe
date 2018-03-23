export const PICK = "PICK";
export const INIT = "INIT";

export function Pick(x, y) {
    return {
        type: PICK,
        payload: { x, y }
    };
}

export function Init(width, height, winSequenceLength) {
    return {
        type: INIT,
        payload: { width, height, winSequenceLength }
    };
}