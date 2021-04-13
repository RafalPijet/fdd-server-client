import { Action } from 'redux';
import { RootState } from '../store';
import { UserState, ChildState } from '../../types/global';

//ACTIONS NAMES
export const ADD_USER = 'user/add_user';
export const CLEAN_USER = 'user/clean_user';
export const ADD_CHILD_TO_USER = 'user/add_child_to_user';

//ACTIONS TYPES
export interface AddUserAction extends Action<typeof ADD_USER> {
    payload: UserState
}
export interface CleanUserAction extends Action<typeof CLEAN_USER> { }
export interface AddChildToUserAction extends Action<typeof ADD_CHILD_TO_USER> {
    payload: ChildState
}

//CREATORS OF ACTIONS
export const addCurrentUser = (user: UserState): AddUserAction => ({
    type: ADD_USER,
    payload: user
})
export const cleanCurrentUser = (): CleanUserAction => ({
    type: CLEAN_USER
})
export const addChildToUser = (child: ChildState): AddChildToUserAction => ({
    type: ADD_CHILD_TO_USER,
    payload: child
})

//SELECTORS
export const getUser = (rootState: RootState) => rootState.user;
export const getUserId = (rootState: RootState) => getUser(rootState)._id;
export const getUserStatus = (rootState: RootState) => getUser(rootState).status;
export const getUserChildren = (rootState: RootState) => getUser(rootState).children;
export const getUserName = (rootState: RootState) => `${getUser(rootState).firstName} ${getUser(rootState).lastName}`