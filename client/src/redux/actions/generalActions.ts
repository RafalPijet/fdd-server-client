import { Action } from 'redux';
import { RootState } from '../store';
import { GeneralState } from '../../types/global';

//ACTIONS NAMES
export const SET_TOAST = 'general/set_toast';
export const SET_MODAL_ARE_YOU_SURE = 'general/set_modal_are_you_sure';
export const SET_IS_REMOVED = 'general/set_is_removed';

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

//SELECTORS
export const getGeneral = (rootState: RootState) => rootState.general;
export const getToast = (rootState: RootState) => getGeneral(rootState).toast;
export const getModalAreYouSure = (rootState: RootState) => getGeneral(rootState).modalAreYouSure;
export const getIsRemoved = (rootState: RootState) => getGeneral(rootState).isRemoved;