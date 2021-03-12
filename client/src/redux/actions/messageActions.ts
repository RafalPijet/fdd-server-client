import { Action } from 'redux';
import { RootState } from '../store';
import { MessageState } from '../../types/global';

//ACTIONS NAMES
export const LOAD_MESSAGES = 'messages/load_messages';
export const SET_TOAST = 'messages/set_toast';

//ACTIONS TYPES
export interface LoadMessagesAction extends Action<typeof LOAD_MESSAGES> {
    payload: MessageState["messages"];
}

export interface SetToastAction extends Action<typeof SET_TOAST> {
    payload: MessageState["toast"];
}

//CREATORS OF ACTIONS
export const loadUserMessages = (messages: MessageState["messages"]): LoadMessagesAction => ({
    type: LOAD_MESSAGES,
    payload: messages
})

export const setUserToast = (toast: MessageState["toast"]): SetToastAction => ({
    type: SET_TOAST,
    payload: toast
})

//SELECTORS
export const getMessages = (rootState: RootState) => rootState.userMessages.messages;
export const getToast = (rootState: RootState) => rootState.userMessages.toast;