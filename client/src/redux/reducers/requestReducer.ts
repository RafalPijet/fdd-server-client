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
    StartMessagesRequestAction,
    StopMessagesRequestAction,
    ErrorMessagesRequestAction,
    ResetMessagesRequestAction,
    StartReportingRequestAction,
    StopReportingRequestAction,
    ErrorReportingRequestAction,
    ResetReportingRequestAction,
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
    RESET_ADDING_REQUEST,
    START_MESSAGES_REQUEST,
    STOP_MESSAGES_REQUEST,
    ERROR_MESSAGES_REQUEST,
    RESET_MESSAGES_REQUEST,
    START_REPORTING_REQUEST,
    STOP_REPORTING_REQUEST,
    ERROR_REPORTING_REQUEST,
    RESET_REPORTING_REQUEST
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
    messages: boolean;
    messagesError: errorContent;
    messagesSuccess: boolean;
    reporting: boolean;
    reportingError: errorContent;
    reportingSuccess: boolean;
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
    addingSuccess: false,
    messages: false,
    messagesError: {
        isError: false,
        message: ""
    },
    messagesSuccess: false,
    reporting: false,
    reportingError: {
        isError: false,
        message: ""
    },
    reportingSuccess: false
}

const requestReducer = (
    state: RequestState = initialState,
    action: StartRequestAction | StopRequestAction | ErrorRequestAction | ResetRequestAction
        | StartUpdatingRequestAction | StopUpdatingRequestAction | ErrorUpdatingRequestAction | ResetUpdatingRequestAction |
        StartAddingRequestAction | StopAddingRequestAction | ErrorAddingRequestAction | ResetAddingRequestAction |
        StartMessagesRequestAction | StopMessagesRequestAction | ErrorMessagesRequestAction | ResetMessagesRequestAction |
        StartReportingRequestAction | StopReportingRequestAction | ErrorReportingRequestAction | ResetReportingRequestAction
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
        case START_MESSAGES_REQUEST:
            return { ...state, messages: true }
        case STOP_MESSAGES_REQUEST:
            return { ...state, messages: false, messagesSuccess: true }
        case ERROR_MESSAGES_REQUEST:
            return { ...state, messages: false, messagesError: action.payload }
        case RESET_MESSAGES_REQUEST:
            return {
                ...state,
                messages: false, messagesSuccess: false, messagesError: {
                    isError: false,
                    message: ""
                }
            }
        case START_REPORTING_REQUEST:
            return { ...state, reporting: true }
        case STOP_REPORTING_REQUEST:
            return { ...state, reporting: false, reportingSuccess: true }
        case ERROR_REPORTING_REQUEST:
            return { ...state, reporting: false, reportingError: action.payload }
        case RESET_REPORTING_REQUEST:
            return {
                ...state,
                reporting: false,
                reportingSuccess: false,
                reportingError: {
                    isError: false,
                    message: ""
                }
            }
        default:
            return { ...state };
    }
}

export default requestReducer;