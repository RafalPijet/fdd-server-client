import { AddUserAction, ADD_USER } from '../actions/userActions';
import { UserState, UserStatus } from '../../types/global';

const initialState: UserState = {
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
    action: AddUserAction
) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                status: action.payload.status,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                phone: action.payload.phone,
                children: action.payload.children,
                adress: action.payload.adress
            }
        default:
            return { ...state }
    }
}

export default userReducer;