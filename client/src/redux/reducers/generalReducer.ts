import { SET_TOAST, SetToastAction, SET_MODAL_ARE_YOU_SURE, SetModalAreYouSure } from '../actions/generalActions';
import { GeneralState } from '../../types/global';

const initialState: GeneralState = {
    toast: {
        isOpen: false,
        content: '',
        variant: "success"
    },
    modalAreYouSure: {
        isOpen: false,
        title: "",
        description: "",
        data: {}
    }
}

const generalReducer = (
    state: GeneralState = initialState,
    action: SetToastAction | SetModalAreYouSure
) => {
    switch (action.type) {
        case SET_TOAST:
            return { ...state, toast: action.payload };
        case SET_MODAL_ARE_YOU_SURE:
            return { ...state, modalAreYouSure: action.payload };
        default:
            return { ...state }
    }
}

export default generalReducer;