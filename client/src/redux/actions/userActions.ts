import { Action } from 'redux';
import { RootState } from '../store';
import { UserState } from '../../types/global';

//ACTIONS NAMES
export const ADD_USER = 'user/add_user';

//ACTIONS TYPES
export interface AddUserAction extends Action<typeof ADD_USER> {
    payload: UserState
}

//CREATORS OF ACTIONS
export const addCurrentUser = (user: UserState): AddUserAction => ({
    type: ADD_USER,
    payload: user
})

//SELECTORS
export const getUser = (rootState: RootState) => rootState.user;
export const getUserStatus = (rootState: RootState) => getUser(rootState).status;