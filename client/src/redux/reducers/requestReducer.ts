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

export type errorContent = {
    isError: boolean,
    message: string
}

export interface RequestState {
    pending: boolean;
    error: errorContent;
    success: boolean;
}

const initialState: RequestState = {
    pending: false,
    error: {
        isError: false,
        message: ""
    },
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
            return { ...state, pending: false, error: action.payload }
        case RESET_REQUEST:
            return {
                pending: false, success: false, error: {
                    isError: false,
                    message: ""
                }
            }
        default:
            return { ...state };
    }
}

export default requestReducer;