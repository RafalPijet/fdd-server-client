import { Action } from 'redux';
import { RootState } from '../store';
import { errorContent } from '../reducers/requestReducer';

//ACTIONS NAMES
export const START_REQUEST = 'request/start_request';
export const STOP_REQUEST = 'request/stop_request';
export const ERROR_REQUEST = 'request/error_request';
export const RESET_REQUEST = 'request/reset_request';

//ACTIONS TYPES
export interface StartRequestAction extends Action<typeof START_REQUEST> { }
export interface StopRequestAction extends Action<typeof STOP_REQUEST> { }
export interface ErrorRequestAction extends Action<typeof ERROR_REQUEST> {
    payload: errorContent
}
export interface ResetRequestAction extends Action<typeof RESET_REQUEST> { }

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

//SELECTORS
export const getRequest = (rootState: RootState) => rootState.request;
export const getPending = (rootState: RootState) => getRequest(rootState).pending;
export const getSuccess = (rootState: RootState) => getRequest(rootState).success;
export const getError = (rootState: RootState) => getRequest(rootState).error;
