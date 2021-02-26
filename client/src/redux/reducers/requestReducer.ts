import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    ResetRequestAction,
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST
} from '../actions/requestActions';

export interface RequestState {
    pending: boolean;
    error: boolean;
    success: boolean;
}

const initialState: RequestState = {
    pending: false,
    error: false,
    success: false
}

const requestReducer = (
    state: RequestState = initialState,
    action: StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
) => {
    switch (action.type) {
        case START_REQUEST:
            return { ...state, pending: true }
        case STOP_REQUEST:
            return { ...state, pending: false, success: true }
        case ERROR_REQUEST:
            return { ...state, pending: false, error: true }
        case RESET_REQUEST:
            return { pending: false, success: false, error: false }
        default:
            return state;
    }
}

export default requestReducer;