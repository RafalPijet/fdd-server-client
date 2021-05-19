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
    SetSelectedUserTypeAction,
    UPDATE_SELECTED_PERSON_CHILD_DATA,
    UpdateSelectedPersonChildDataAction,
    UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST,
    UpdateSelectedPersonChildImagesListAction,
    UPDATE_SELECTED_PERSON_CHILD_AVATAR,
    UpdateSelectedPersonChildAvatarAction
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
        SetEventChange | SetSelectedChild | SetSelectedPersonAction | SetSelectedUserTypeAction |
        UpdateSelectedPersonChildDataAction | UpdateSelectedPersonChildImagesListAction |
        UpdateSelectedPersonChildAvatarAction
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
        case UPDATE_SELECTED_PERSON_CHILD_DATA:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    birthDate: action.payload.birthDate,
                    info: action.payload.info
                }
            }
        case UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    images: action.payload
                }
            }
        case UPDATE_SELECTED_PERSON_CHILD_AVATAR:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    avatar: action.payload
                }
            }
        default:
            return { ...state }
    }
}

export default generalReducer;