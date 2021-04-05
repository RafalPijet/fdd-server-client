import {
    SET_TOAST,
    SetToastAction,
    SET_MODAL_ARE_YOU_SURE,
    SetModalAreYouSure,
    SET_IS_REMOVED,
    SetIsRemoved,
    SET_EVENT_CHANGE,
    SetEventChange
} from '../actions/generalActions';
import { GeneralState, ModalAYSModes } from '../../types/global';

const initialState: GeneralState = {
    toast: {
        isOpen: false,
        content: '',
        variant: "success"
    },
    modalAreYouSure: {
        mode: ModalAYSModes.null,
        isOpen: false,
        title: "",
        description: "",
        data: {}
    },
    isRemoved: false,
    eventChange: {
        isAction: false,
        data: undefined
    }
}

const generalReducer = (
    state: GeneralState = initialState,
    action: SetToastAction | SetModalAreYouSure | SetIsRemoved | SetEventChange
) => {
    switch (action.type) {
        case SET_TOAST:
            return { ...state, toast: action.payload };
        case SET_MODAL_ARE_YOU_SURE:
            return { ...state, modalAreYouSure: action.payload };
        case SET_IS_REMOVED:
            return { ...state, isRemoved: action.payload };
        case SET_EVENT_CHANGE:
            return { ...state, eventChange: action.payload }
        default:
            return { ...state }
    }
}

export default generalReducer;