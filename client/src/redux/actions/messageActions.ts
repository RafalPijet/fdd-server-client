import { Action } from 'redux';
import { RootState } from '../store';
import { MessageState, IMessage } from '../../types/global';

//ACTIONS NAMES
export const LOAD_MESSAGES = 'messages/load_messages';
export const SET_TOAST = 'messages/set_toast';
export const SET_MESSAGE_IS_READED = 'messages/set_message_is_readed';

//ACTIONS TYPES
export interface LoadMessagesAction extends Action<typeof LOAD_MESSAGES> {
    payload: MessageState["messages"];
    quantity: MessageState["quantity"];
}

export interface SetToastAction extends Action<typeof SET_TOAST> {
    payload: MessageState["toast"];
}

export interface SetMessageIsReaded extends Action<typeof SET_MESSAGE_IS_READED> {
    _id: IMessage["_id"]
}

//CREATORS OF ACTIONS
export const loadUserMessages = (
    messages: MessageState["messages"],
    quantity: MessageState["quantity"]): LoadMessagesAction => ({
        type: LOAD_MESSAGES,
        payload: messages,
        quantity
    })

export const setUserToast = (toast: MessageState["toast"]): SetToastAction => ({
    type: SET_TOAST,
    payload: toast
})

export const setMessageIsReaded = (_id: IMessage["_id"]): SetMessageIsReaded => ({
    type: SET_MESSAGE_IS_READED,
    _id: _id
})

//SELECTORS
export const getMessages = (rootState: RootState) => rootState.userMessages.messages;
export const getQuantity = (rootState: RootState) => rootState.userMessages.quantity;
export const getToast = (rootState: RootState) => rootState.userMessages.toast;