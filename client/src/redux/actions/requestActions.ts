import { Action } from 'redux';
import { RootState } from '../store';
import { errorContent } from '../reducers/requestReducer';

//ACTIONS NAMES
export const START_REQUEST = 'request/start_request';
export const STOP_REQUEST = 'request/stop_request';
export const ERROR_REQUEST = 'request/error_request';
export const RESET_REQUEST = 'request/reset_request';
export const START_UPDATING_REQUEST = 'request/start_updating_request';
export const STOP_UPDATING_REQUEST = 'request/stop_updating_request';
export const ERROR_UPDATING_REQUEST = 'request/error_updating_request';
export const RESET_UPDATING_REQUEST = 'request/reset_updating_request';
export const START_ADDING_REQUEST = 'request/start_adding_request';
export const STOP_ADDING_REQUEST = 'request/stop_adding_request';
export const ERROR_ADDING_REQUEST = 'request/error_adding_request';
export const RESET_ADDING_REQUEST = 'request/reset_adding_request';
export const START_MESSAGES_REQUEST = 'request/start_messages_request';
export const STOP_MESSAGES_REQUEST = 'request/stop_messages_request';
export const ERROR_MESSAGES_REQUEST = 'request/error_messages_request';
export const RESET_MESSAGES_REQUEST = 'request/reset_messages_request';
export const START_REPORTING_REQUEST = 'request/start_reporting_request';
export const STOP_REPORTING_REQUEST = 'request/stop_reporting_request';
export const ERROR_REPORTING_REQUEST = 'request/error_reporting_request';
export const RESET_REPORTING_REQUEST = 'request/reset_reporting_request';

//ACTIONS TYPES
export interface StartRequestAction extends Action<typeof START_REQUEST> { }
export interface StopRequestAction extends Action<typeof STOP_REQUEST> { }
export interface ErrorRequestAction extends Action<typeof ERROR_REQUEST> {
    payload: errorContent
}
export interface ResetRequestAction extends Action<typeof RESET_REQUEST> { }
export interface StartUpdatingRequestAction extends Action<typeof START_UPDATING_REQUEST> { }
export interface StopUpdatingRequestAction extends Action<typeof STOP_UPDATING_REQUEST> { }
export interface ErrorUpdatingRequestAction extends Action<typeof ERROR_UPDATING_REQUEST> {
    payload: errorContent
}
export interface ResetUpdatingRequestAction extends Action<typeof RESET_UPDATING_REQUEST> { }
export interface StartAddingRequestAction extends Action<typeof START_ADDING_REQUEST> { }
export interface StopAddingRequestAction extends Action<typeof STOP_ADDING_REQUEST> { }
export interface ErrorAddingRequestAction extends Action<typeof ERROR_ADDING_REQUEST> {
    payload: errorContent
}
export interface ResetAddingRequestAction extends Action<typeof RESET_ADDING_REQUEST> { }
export interface StartMessagesRequestAction extends Action<typeof START_MESSAGES_REQUEST> { }
export interface StopMessagesRequestAction extends Action<typeof STOP_MESSAGES_REQUEST> { }
export interface ErrorMessagesRequestAction extends Action<typeof ERROR_MESSAGES_REQUEST> {
    payload: errorContent
}
export interface ResetMessagesRequestAction extends Action<typeof RESET_MESSAGES_REQUEST> { }
export interface StartReportingRequestAction extends Action<typeof START_REPORTING_REQUEST> { }
export interface StopReportingRequestAction extends Action<typeof STOP_REPORTING_REQUEST> { }
export interface ErrorReportingRequestAction extends Action<typeof ERROR_REPORTING_REQUEST> {
    payload: errorContent
}
export interface ResetReportingRequestAction extends Action<typeof RESET_REPORTING_REQUEST> { }

//CREATORS OF ACTIONS
export const startRequest = (): StartRequestAction => ({
    type: START_REQUEST
})
export const stopRequest = (): StopRequestAction => ({
    type: STOP_REQUEST
})
export const errorRequest = (error: errorContent): ErrorRequestAction => ({
    type: ERROR_REQUEST,
    payload: error
})
export const resetRequest = (): ResetRequestAction => ({
    type: RESET_REQUEST
})
export const startUpdatingRequest = (): StartUpdatingRequestAction => ({
    type: START_UPDATING_REQUEST
})
export const stopUpdatingRequest = (): StopUpdatingRequestAction => ({
    type: STOP_UPDATING_REQUEST
})
export const errorUpdatingRequest = (error: errorContent): ErrorUpdatingRequestAction => ({
    type: ERROR_UPDATING_REQUEST,
    payload: error
})
export const resetUpdatingRequest = (): ResetUpdatingRequestAction => ({
    type: RESET_UPDATING_REQUEST
})
export const startAddingRequest = (): StartAddingRequestAction => ({
    type: START_ADDING_REQUEST
})
export const stopAddingRequest = (): StopAddingRequestAction => ({
    type: STOP_ADDING_REQUEST
})
export const errorAddingRequest = (error: errorContent): ErrorAddingRequestAction => ({
    type: ERROR_ADDING_REQUEST,
    payload: error
})
export const resetAddingRequest = (): ResetAddingRequestAction => ({
    type: RESET_ADDING_REQUEST
})
export const startMessagesRequest = (): StartMessagesRequestAction => ({
    type: START_MESSAGES_REQUEST
})
export const stopMessagesRequest = (): StopMessagesRequestAction => ({
    type: STOP_MESSAGES_REQUEST
})
export const errorMessagesRequest = (error: errorContent): ErrorMessagesRequestAction => ({
    type: ERROR_MESSAGES_REQUEST,
    payload: error
})
export const resetMessagesRequest = (): ResetMessagesRequestAction => ({
    type: RESET_MESSAGES_REQUEST
})
export const startReportingRequest = (): StartReportingRequestAction => ({
    type: START_REPORTING_REQUEST
})
export const stopReportingRequest = (): StopReportingRequestAction => ({
    type: STOP_REPORTING_REQUEST
})
export const errorReportingRequest = (error: errorContent): ErrorReportingRequestAction => ({
    type: ERROR_REPORTING_REQUEST,
    payload: error
})
export const resetReportingRequest = (): ResetReportingRequestAction => ({
    type: RESET_REPORTING_REQUEST
})

//SELECTORS
export const getRequest = (rootState: RootState) => rootState.request;
export const getPending = (rootState: RootState) => getRequest(rootState).pending;
export const getSuccess = (rootState: RootState) => getRequest(rootState).success;
export const getError = (rootState: RootState) => getRequest(rootState).error;
export const getUpdating = (rootState: RootState) => getRequest(rootState).updating;
export const getUpdatingSuccess = (rootState: RootState) => getRequest(rootState).updatingSuccess;
export const getUpdatingError = (rootState: RootState) => getRequest(rootState).updatingError;
export const getAdding = (rootState: RootState) => getRequest(rootState).adding;
export const getAddingSuccess = (rootState: RootState) => getRequest(rootState).addingSuccess;
export const getAddingError = (rootState: RootState) => getRequest(rootState).addingError;
export const getMessages = (rootState: RootState) => getRequest(rootState).messages;
export const getMessagesSuccess = (rootState: RootState) => getRequest(rootState).messagesSuccess;
export const getMessagesError = (rootState: RootState) => getRequest(rootState).messagesError;
export const getReporting = (rootState: RootState) => getRequest(rootState).reporting;
export const getReportingSuccess = (rootState: RootState) => getRequest(rootState).reportingSuccess
export const getReportingError = (rootState: RootState) => getRequest(rootState).reportingError;

