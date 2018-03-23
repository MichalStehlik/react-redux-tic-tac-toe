import { EXAMPLE_ACTION } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
    switch (action.type) {
        case EXAMPLE_ACTION:
            return [action.payload.data, ...state]
        default:
            return state;
    }
}