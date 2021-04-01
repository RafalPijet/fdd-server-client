import {
    LOAD_MESSAGES,
    SET_MESSAGE_IS_READED,
    LoadMessagesAction,
    SetMessageIsReaded
} from '../actions/messageActions';
import { MessageState, IMessage } from '../../types/global';

const initialState: MessageState = {
    messages: [],
    quantity: 0,
}

const messagesReducer = (
    state: MessageState = initialState,
    action: LoadMessagesAction | SetMessageIsReaded
) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return { ...state, messages: action.payload, quantity: action.quantity };
        case SET_MESSAGE_IS_READED:
            return {
                ...state,
                messages: state.messages.map((item: IMessage) => {
                    if (item._id === action._id) {
                        item.new = false;
                    }
                    return item;
                })
            }
        default:
            return { ...state };
    }
}

export default messagesReducer;