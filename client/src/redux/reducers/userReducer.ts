import {
    AddUserAction,
    CleanUserAction,
    AddChildToUserAction,
    SetChildImagesListAction,
    SetChildAvatarAction,
    UpdateChildDataAction,
    UpdateUserDataAction,
    ADD_USER,
    CLEAN_USER,
    ADD_CHILD_TO_USER,
    SET_CHILD_IMAGES_LIST,
    SET_CHILD_AVATAR,
    UPDATE_CHILD_DATA,
    UPDATE_USER_DATA,
    UPDATE_CHILD_STATUS,
    UpdateChildStatusAction
} from '../actions/userActions';
import { UserState, UserStatus } from '../../types/global';

const initialState: UserState = {
    _id: "",
    status: UserStatus.null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    children: [],
    adress: {
        zipCode: "",
        town: "",
        street: "",
        number: ""
    }
}

const userReducer = (
    state: UserState = initialState,
    action: AddUserAction | CleanUserAction | AddChildToUserAction | SetChildImagesListAction |
        SetChildAvatarAction | UpdateChildDataAction | UpdateUserDataAction | UpdateChildStatusAction
) => {
    switch (action.type) {
        case ADD_USER:
            return {
                _id: action.payload._id,
                status: action.payload.status,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phone: action.payload.phone,
                children: action.payload.children,
                adress: action.payload.adress
            }
        case ADD_CHILD_TO_USER:
            return { ...state, children: [...state.children, action.payload] };
        case CLEAN_USER:
            return { ...initialState };
        case SET_CHILD_IMAGES_LIST:
            return {
                ...state,
                children: state.children.map((child) => {
                    if (child._id === action.childId) {
                        child.images = action.images;
                    }
                    return child;
                })
            }
        case SET_CHILD_AVATAR:
            return {
                ...state,
                children: state.children.map((child) => {
                    if (child._id === action.childId) {
                        child.avatar = action.avatar
                    }
                    return child;
                })
            }
        case UPDATE_CHILD_DATA:
            return {
                ...state,
                children: state.children.map((child) => {
                    if (child._id === action.childId) {
                        child.firstName = action.payload.firstName;
                        child.lastName = action.payload.lastName;
                        child.birthDate = action.payload.birthDate;
                        child.info = action.payload.info;
                    }
                    return child;
                })
            }
        case UPDATE_CHILD_STATUS:
            return {
                ...state,
                children: state.children.map((child) => {
                    if (child._id === action.childId) {
                        child.active = action.isActive
                    }
                    return child;
                })
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phone: action.payload.phone,
                adress: action.payload.adress
            }
        default:
            return { ...state };
    }
}

export default userReducer;