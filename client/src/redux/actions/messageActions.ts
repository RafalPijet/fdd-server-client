import { Action } from 'redux';
import { RootState } from '../store';
import { MessageState } from '../../types/global';

//ACTIONS NAMES
export const LOAD_MESSAGES = 'messages/load_messages'

//ACTIONS TYPES
export interface LoadMessagesAction extends Action<typeof LOAD_MESSAGES> {
    payload: MessageState["messages"]
}

//CREATORS OF ACTIONS
export const loadUserMessages = (messages: MessageState["messages"]): LoadMessagesAction => ({
    type: LOAD_MESSAGES,
    payload: messages
})

//SELECTORS
export const getMessages = (rootState: RootState) => rootState.userMessages.messages;