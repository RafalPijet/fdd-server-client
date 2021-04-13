import {
    AddUserAction,
    CleanUserAction,
    AddChildToUserAction,
    ADD_USER,
    CLEAN_USER,
    ADD_CHILD_TO_USER
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
    action: AddUserAction | CleanUserAction | AddChildToUserAction
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
        default:
            return { ...state };
    }
}

export default userReducer;