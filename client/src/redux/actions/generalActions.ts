import { Action } from 'redux';
import { RootState } from '../store';
import { GeneralState, IChildData } from '../../types/global';

//ACTIONS NAMES
export const SET_TOAST = 'general/set_toast';
export const SET_MODAL_ARE_YOU_SURE = 'general/set_modal_are_you_sure';
export const SET_IS_REMOVED = 'general/set_is_removed';
export const SET_IS_OPEN = 'general/set_is_open';
export const SET_EVENT_CHANGE = 'general/set_event_change';
export const SET_SELECTED_CHILD = 'general/set_selected_child';
export const SET_SELECTED_PERSON = 'general/set_selected_person';
export const SET_SELECTED_USER_TYPE = 'general/set_selected_user_type';
export const UPDATE_SELECTED_PERSON_CHILD_DATA = 'general/update_selected_person_child_data';
export const UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST = 'general/update_selected_person_child_images_list';
export const UPDATE_SELECTED_PERSON_CHILD_AVATAR = 'general/update_selected_person_child_avatar';

//ACTIONS TYPES
export interface SetToastAction extends Action<typeof SET_TOAST> {
    payload: GeneralState["toast"];
}
export interface SetModalAreYouSure extends Action<typeof SET_MODAL_ARE_YOU_SURE> {
    payload: GeneralState["modalAreYouSure"];
}
export interface SetIsRemoved extends Action<typeof SET_IS_REMOVED> {
    payload: GeneralState["isRemoved"];
}
export interface SetIsOpen extends Action<typeof SET_IS_OPEN> {
    payload: GeneralState["isOpen"];
}
export interface SetEventChange extends Action<typeof SET_EVENT_CHANGE> {
    payload: GeneralState["eventChange"];
}
export interface SetSelectedChild extends Action<typeof SET_SELECTED_CHILD> {
    payload: GeneralState["selectedChild"]
}
export interface SetSelectedPersonAction extends Action<typeof SET_SELECTED_PERSON> {
    payload: GeneralState["selectedPerson"]
}
export interface SetSelectedUserTypeAction extends Action<typeof SET_SELECTED_USER_TYPE> {
    payload: GeneralState["selectedUserType"]
}
export interface UpdateSelectedPersonChildDataAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_DATA> {
    payload: IChildData
}
export interface UpdateSelectedPersonChildImagesListAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST> {
    payload: string[]
}
export interface UpdateSelectedPersonChildAvatarAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_AVATAR> {
    payload: string
}

//CREATORS OF ACTIONS
export const setUserToast = (toast: GeneralState["toast"]): SetToastAction => ({
    type: SET_TOAST,
    payload: toast
})
export const setModalAreYouSure = (payload: GeneralState["modalAreYouSure"]): SetModalAreYouSure => ({
    type: SET_MODAL_ARE_YOU_SURE,
    payload
})
export const setIsRemoved = (isRemoved: GeneralState["isRemoved"]): SetIsRemoved => ({
    type: SET_IS_REMOVED,
    payload: isRemoved
})
export const setIsOpen = (isOpen: GeneralState["isRemoved"]): SetIsOpen => ({
    type: SET_IS_OPEN,
    payload: isOpen
})
export const setEventChange = (payload: GeneralState["eventChange"]): SetEventChange => ({
    type: SET_EVENT_CHANGE,
    payload
})
export const setSelectedChild = (childId: GeneralState["selectedChild"]): SetSelectedChild => ({
    type: SET_SELECTED_CHILD,
    payload: childId
})
export const setSelectedPerson = (payload: GeneralState["selectedPerson"]): SetSelectedPersonAction => ({
    type: SET_SELECTED_PERSON,
    payload
})
export const setSelectedUserType = (userType: GeneralState["selectedUserType"]): SetSelectedUserTypeAction => ({
    type: SET_SELECTED_USER_TYPE,
    payload: userType
})
export const updateSelectedPersonChildData = (childData: IChildData): UpdateSelectedPersonChildDataAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_DATA,
    payload: childData
})
export const updateSelectedPersonalChildImagesList = (images: string[]): UpdateSelectedPersonChildImagesListAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST,
    payload: images
})
export const updateSelectedPersonalChildAvatar = (image: string): UpdateSelectedPersonChildAvatarAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_AVATAR,
    payload: image
})

//SELECTORS
export const getGeneral = (rootState: RootState) => rootState.general;
export const getToast = (rootState: RootState) => getGeneral(rootState).toast;
export const getModalAreYouSure = (rootState: RootState) => getGeneral(rootState).modalAreYouSure;
export const getIsRemoved = (rootState: RootState) => getGeneral(rootState).isRemoved;
export const getIsOpen = (rootState: RootState) => getGeneral(rootState).isOpen;
export const getEventChange = (rootState: RootState) => getGeneral(rootState).eventChange;
export const getSelectedChild = (rootState: RootState) => getGeneral(rootState).selectedChild;
export const getSelectedPerson = (rootState: RootState) => getGeneral(rootState).selectedPerson;
export const getSelectedUserType = (rootState: RootState) => getGeneral(rootState).selectedUserType;