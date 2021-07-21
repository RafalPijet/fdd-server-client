import {
    LOAD_MESSAGES,
    SET_MESSAGE_IS_READED,
    ADD_MESSAGE_ITEM_ON_FIRST_PLACE,
    LoadMessagesAction,
    SetMessageIsReaded,
    AddMessageItemOnFirstPlaceAction
} from '../actions/messageActions';
import { MessageState, IMessage } from '../../types/global';

const initialState: MessageState = {
    messages: [],
    quantity: 0,
}

const messagesReducer = (
    state: MessageState = initialState,
    action: LoadMessagesAction | SetMessageIsReaded | AddMessageItemOnFirstPlaceAction
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
        case ADD_MESSAGE_ITEM_ON_FIRST_PLACE:
            let messages: IMessage[] = state.messages;
            messages.unshift(action.payload);
            messages.pop();
            return {
                ...state,
                messages
            }
        default:
            return { ...state };
    }
}

export default messagesReducer;