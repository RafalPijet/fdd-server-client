import {
    LOAD_MESSAGES,
    SET_TOAST,
    SET_MESSAGE_IS_READED,
    LoadMessagesAction,
    SetToastAction,
    setMessageIsReaded,
    SetMessageIsReaded
} from '../actions/messageActions';
import { MessageState, IMessage } from '../../types/global';

const initialState: MessageState = {
    messages: [],
    quantity: 0,
    toast: {
        isOpen: false,
        content: '',
        variant: "success"
    }
}

const messagesReducer = (
    state: MessageState = initialState,
    action: LoadMessagesAction | SetToastAction | SetMessageIsReaded
) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return { ...state, messages: action.payload, quantity: action.quantity };
        case SET_TOAST:
            return { ...state, toast: action.payload };
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