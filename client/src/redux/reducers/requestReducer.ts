import {
    StartRequestAction,
    StopRequestAction,
    ErrorRequestAction,
    ResetRequestAction,
    StartUpdatingRequestAction,
    StopUpdatingRequestAction,
    ErrorUpdatingRequestAction,
    ResetUpdatingRequestAction,
    StartAddingRequestAction,
    StopAddingRequestAction,
    ErrorAddingRequestAction,
    ResetAddingRequestAction,
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST,
    START_UPDATING_REQUEST,
    STOP_UPDATING_REQUEST,
    ERROR_UPDATING_REQUEST,
    RESET_UPDATING_REQUEST,
    START_ADDING_REQUEST,
    STOP_ADDING_REQUEST,
    ERROR_ADDING_REQUEST,
    RESET_ADDING_REQUEST
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
    adding: boolean;
    addingError: errorContent;
    addingSuccess: boolean;
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
    updatingSuccess: false,
    adding: false,
    addingError: {
        isError: false,
        message: ""
    },
    addingSuccess: false
}

const requestReducer = (
    state: RequestState = initialState,
    action: StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
        | StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction | ResetUpdatingRequestAction |
        StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction | ResetAddingRequestAction
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
        case START_ADDING_REQUEST:
            return { ...state, adding: true }
        case STOP_ADDING_REQUEST:
            return { ...state, adding: false, addingSuccess: true }
        case ERROR_ADDING_REQUEST:
            return { ...state, adding: false, addingError: action.payload }
        case RESET_ADDING_REQUEST:
            return {
                ...state,
                adding: false, addingSuccess: false, addingError: {
                    isError: false,
                    message: ""
                }
            }
        default:
            return { ...state };
    }
}

export default requestReducer;