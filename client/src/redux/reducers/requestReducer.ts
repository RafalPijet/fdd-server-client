import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    ResetRequestAction,
    StartUpdatingRequestAction,
    StopUpdatingRequestAction,
    ErrorUpdatingRequestAction,
    ResetUpdatingRequestAction,
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST,
    START_UPDATING_REQUEST,
    STOP_UPDATING_REQUEST,
    ERROR_UPDATING_REQUEST,
    RESET_UPDATING_REQUEST
} from '../actions/requestActions';

export type errorContent = {
    isError: boolean,
    message: string
}

export interface RequestState {
    pending: boolean;
    error: errorContent;
    success: boolean;
    updating: boolean;
    updatingError: errorContent;
    updatingSuccess: boolean;
}

const initialState: RequestState = {
    pending: false,
    error: {
        isError: false,
        message: ""
    },
    success: false,
    updating: false,
    updatingError: {
        isError: false,
        message: ""
    },
    updatingSuccess: false
}

const requestReducer = (
    state: RequestState = initialState,
    action: StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
        | StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction | ResetUpdatingRequestAction
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
                ...state,
                pending: false, success: false, error: {
                    isError: false,
                    message: ""
                }
            }
        case START_UPDATING_REQUEST:
            return { ...state, updating: true }
        case STOP_UPDATING_REQUEST:
            return { ...state, updating: false, updatingSuccess: true }
        case ERROR_UPDATING_REQUEST:
            return { ...state, updating: false, updatingError: action.payload }
        case RESET_UPDATING_REQUEST:
            return {
                ...state,
                updating: false, updatingSuccess: false, updatingError: {
                    isError: false,
                    message: ""
                }
            }
        default:
            return { ...state };
    }
}

export default requestReducer;