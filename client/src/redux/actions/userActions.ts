import { Action } from 'redux';
import { RootState } from '../store';
import { UserState, ChildState, IChildData } from '../../types/global';

//ACTIONS NAMES
export const ADD_USER = 'user/add_user';
export const CLEAN_USER = 'user/clean_user';
export const ADD_CHILD_TO_USER = 'user/add_child_to_user';
export const SET_CHILD_IMAGES_LIST = 'user/set_child_images_list';
export const SET_CHILD_AVATAR = 'user/set_child_avatar';
export const UPDATE_CHILD_DATA = 'user/update_child_data';
export const UPDATE_USER_DATA = 'user/update_user_data';
export const UPDATE_CHILD_STATUS = 'user/update_child_status';

//ACTIONS TYPES
export interface AddUserAction extends Action<typeof ADD_USER> {
    payload: UserState
}
export interface CleanUserAction extends Action<typeof CLEAN_USER> { }
export interface AddChildToUserAction extends Action<typeof ADD_CHILD_TO_USER> {
    payload: ChildState
}
export interface SetChildImagesListAction extends Action<typeof SET_CHILD_IMAGES_LIST> {
    childId: string,
    images: string[]
}
export interface SetChildAvatarAction extends Action<typeof SET_CHILD_AVATAR> {
    childId: string,
    avatar: string
}
export interface UpdateChildDataAction extends Action<typeof UPDATE_CHILD_DATA> {
    childId: string,
    payload: IChildData
}
export interface UpdateUserDataAction extends Action<typeof UPDATE_USER_DATA> {
    payload: Omit<UserState, "_id" | "status" | "children">
}
export interface UpdateChildStatusAction extends Action<typeof UPDATE_CHILD_STATUS> {
    isActive: boolean,
    childId: string
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
export const setChildImagesList = (childId: string, images: string[]): SetChildImagesListAction => ({
    type: SET_CHILD_IMAGES_LIST,
    childId,
    images
})
export const setChildAvatar = (childId: string, avatar: string): SetChildAvatarAction => ({
    type: SET_CHILD_AVATAR,
    childId,
    avatar
})
export const updateChildData = (childId: string, payload: IChildData): UpdateChildDataAction => ({
    type: UPDATE_CHILD_DATA,
    childId,
    payload
})
export const updateUserData = (payload: Omit<UserState, "_id" | "status" | "children">): UpdateUserDataAction => ({
    type: UPDATE_USER_DATA,
    payload
})
export const updateChildStatus = (childId: string, isActive: boolean): UpdateChildStatusAction => ({
    type: UPDATE_CHILD_STATUS,
    isActive,
    childId
})

//SELECTORS
export const getUser = (rootState: RootState) => rootState.user;
export const getUserId = (rootState: RootState) => getUser(rootState)._id;
export const getUserStatus = (rootState: RootState) => getUser(rootState).status;
export const getUserChildren = (rootState: RootState) => getUser(rootState).children;
export const getUserEmail = (rootState: RootState) => getUser(rootState).email;
export const getUserName = (rootState: RootState) => `${getUser(rootState).firstName} ${getUser(rootState).lastName}`