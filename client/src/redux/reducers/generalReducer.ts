import {
    SET_TOAST,
    SetToastAction,
    SET_MODAL_ARE_YOU_SURE,
    SetModalAreYouSure,
    SET_IS_REMOVED,
    SetIsRemoved,
    SET_IS_OPEN,
    SetIsOpen,
    SET_EVENT_CHANGE,
    SetEventChange,
    SET_SELECTED_CHILD,
    SetSelectedChild,
    SET_SELECTED_PERSON,
    SetSelectedPersonAction,
    SET_SELECTED_USER_TYPE,
    SetSelectedUserTypeAction
} from '../actions/generalActions';
import { GeneralState, ModalAYSModes, SearchUserType } from '../../types/global';

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
    isOpen: false,
    eventChange: {
        isAction: false,
        data: undefined
    },
    selectedChild: null,
    selectedPerson: null,
    selectedUserType: SearchUserType.child
}

const generalReducer = (
    state: GeneralState = initialState,
    action: SetToastAction | SetModalAreYouSure | SetIsRemoved | SetIsOpen |
        SetEventChange | SetSelectedChild | SetSelectedPersonAction | SetSelectedUserTypeAction
) => {
    switch (action.type) {
        case SET_TOAST:
            return { ...state, toast: action.payload };
        case SET_MODAL_ARE_YOU_SURE:
            return { ...state, modalAreYouSure: action.payload };
        case SET_IS_REMOVED:
            return { ...state, isRemoved: action.payload };
        case SET_IS_OPEN:
            return { ...state, isOpen: action.payload };
        case SET_EVENT_CHANGE:
            return { ...state, eventChange: action.payload };
        case SET_SELECTED_CHILD:
            return { ...state, selectedChild: action.payload };
        case SET_SELECTED_PERSON:
            return { ...state, selectedPerson: action.payload };
        case SET_SELECTED_USER_TYPE:
            return { ...state, selectedUserType: action.payload };
        default:
            return { ...state }
    }
}

export default generalReducer;