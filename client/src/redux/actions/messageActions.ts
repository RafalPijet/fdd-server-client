import { Action } from 'redux';
import { RootState } from '../store';
import { MessageState, IMessage } from '../../types/global';

//ACTIONS NAMES
export const LOAD_MESSAGES = 'messages/load_messages';
export const SET_MESSAGE_IS_READED = 'messages/set_message_is_readed';
export const ADD_MESSAGE_ITEM_ON_FIRST_PLACE = 'messages/add_message_item_on_first_place';

//ACTIONS TYPES
export interface LoadMessagesAction extends Action<typeof LOAD_MESSAGES> {
    payload: MessageState["messages"];
    quantity: MessageState["quantity"];
}

export interface SetMessageIsReaded extends Action<typeof SET_MESSAGE_IS_READED> {
    _id: IMessage["_id"]
}

export interface AddMessageItemOnFirstPlaceAction extends Action<typeof ADD_MESSAGE_ITEM_ON_FIRST_PLACE> {
    message: IMessage,
    messageQuantity: number
}

//CREATORS OF ACTIONS
export const loadUserMessages = (
    messages: MessageState["messages"],
    quantity: MessageState["quantity"]): LoadMessagesAction => ({
        type: LOAD_MESSAGES,
        payload: messages,
        quantity
    })

export const setMessageIsReaded = (_id: IMessage["_id"]): SetMessageIsReaded => ({
    type: SET_MESSAGE_IS_READED,
    _id: _id
})

export const addMessageItemOnFirstPlace = (message: IMessage, messageQuantity: number): AddMessageItemOnFirstPlaceAction => ({
    type: ADD_MESSAGE_ITEM_ON_FIRST_PLACE,
    message,
    messageQuantity
})

//SELECTORS
export const getMessages = (rootState: RootState) => rootState.userMessages.messages;
export const getQuantity = (rootState: RootState) => rootState.userMessages.quantity;