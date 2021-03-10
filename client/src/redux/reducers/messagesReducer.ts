import { LOAD_MESSAGES, LoadMessagesAction } from '../actions/messageActions';
import { MessageState } from '../../types/global';

const initialState: MessageState = {
    messages: []
}

const messagesReducer = (
    state: MessageState = initialState,
    action: LoadMessagesAction
) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return { ...state, messages: action.payload }
        default:
            return { ...state };
    }
}

export default messagesReducer;