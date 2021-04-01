import { Action } from 'redux';
import { RootState } from '../store';
import { GeneralState } from '../../types/global';

//ACTIONS NAMES
export const SET_TOAST = 'general/set_toast';
export const SET_MODAL_ARE_YOU_SURE = 'general/set_modal_are_you_sure';

//ACTIONS TYPES
export interface SetToastAction extends Action<typeof SET_TOAST> {
    payload: GeneralState["toast"];
}
export interface SetModalAreYouSure extends Action<typeof SET_MODAL_ARE_YOU_SURE> {
    payload: GeneralState["modalAreYouSure"];
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

//SELECTORS
export const getGeneral = (rootState: RootState) => rootState.general;
export const getToast = (rootState: RootState) => getGeneral(rootState).toast;
export const getModalAreYouSure = (rootState: RootState) => getGeneral(rootState).modalAreYouSure;