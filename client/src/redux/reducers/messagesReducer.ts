import { LOAD_MESSAGES, SET_TOAST, LoadMessagesAction, SetToastAction } from '../actions/messageActions';
import { MessageState } from '../../types/global';

const initialState: MessageState = {
    messages: [],
    toast: {
        isOpen: false,
        content: '',
        variant: "success"
    }
}

const messagesReducer = (
    state: MessageState = initialState,
    action: LoadMessagesAction | SetToastAction
) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return { ...state, messages: action.payload };
        case SET_TOAST:
            return { ...state, toast: action.payload }
        default:
            return { ...state };
    }
}

export default messagesReducer;