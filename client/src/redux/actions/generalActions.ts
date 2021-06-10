import { Action } from 'redux';
import { RootState } from '../store';
import { GeneralState, IChildData, ChildState, UserState } from '../../types/global';

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
export const UPDATE_SELECTED_PERSON_CHILD_INVOICES_LIST = 'general/update_selected_person_child_invoices_list';
export const UPDATE_SELECTED_PERSON_CHILD_AVATAR = 'general/update_selected_person_child_avatar';
export const ADD_CHILD_TO_SELECTED_PERSON = 'general/add_child_to_selected_person';
export const UPDATE_SELECTED_PERSON_USER_DATA = 'general/update_selected_person_user_data';
export const SET_SELECTED_QUANTITY = 'general/set_selected_quantity';
export const SET_ALL_NEWS = 'general/set_all_news';
export const UPDATE_PICTURES_OF_CURRENT_NEWS = 'general/update_pictures_of_current_news';
export const UPDATE_NEWS_OF_PUBLICATION = 'general/update_news_of_publication';

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
export interface UpdateSelectedPersonChildInvoicesListAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_INVOICES_LIST> {
    payload: string[]
}
export interface UpdateSelectedPersonChildAvatarAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_AVATAR> {
    payload: string
}
export interface AddChildToSelectedPersonAction extends Action<typeof ADD_CHILD_TO_SELECTED_PERSON> {
    payload: ChildState
}
export interface UpdateSelectedPersonUserDataAction extends Action<typeof UPDATE_SELECTED_PERSON_USER_DATA> {
    payload: Omit<UserState, "_id" | "status" | "children">
}
export interface SetSelectedQuantityAction extends Action<typeof SET_SELECTED_QUANTITY> {
    payload: GeneralState["selectedQuantity"];
}
export interface SetAllNewsAction extends Action<typeof SET_ALL_NEWS> {
    payload: GeneralState["news"];
}
export interface UpdatePicturesOfCurrentNewsAction extends Action<typeof UPDATE_PICTURES_OF_CURRENT_NEWS> {
    payload: string[],
    newsId: string
}
export interface UpdateNewsOfPublicationAction extends Action<typeof UPDATE_NEWS_OF_PUBLICATION> {
    payload: boolean,
    newsId: string
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
export const updateSelectedPersonalChildInvoicesList = (invoices: string[]): UpdateSelectedPersonChildInvoicesListAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_INVOICES_LIST,
    payload: invoices
})
export const updateSelectedPersonalChildAvatar = (image: string): UpdateSelectedPersonChildAvatarAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_AVATAR,
    payload: image
})
export const addChildToSelectedPerson = (child: ChildState): AddChildToSelectedPersonAction => ({
    type: ADD_CHILD_TO_SELECTED_PERSON,
    payload: child
})
export const updateSelectedPersonUserData = (userData: Omit<UserState, "_id" | "status" | "children">): UpdateSelectedPersonUserDataAction => ({
    type: UPDATE_SELECTED_PERSON_USER_DATA,
    payload: userData
})
export const setSelectedQuantity = (quantity: GeneralState["selectedQuantity"]): SetSelectedQuantityAction => ({
    type: SET_SELECTED_QUANTITY,
    payload: quantity
})
export const setAllNews = (news: GeneralState["news"]): SetAllNewsAction => ({
    type: SET_ALL_NEWS,
    payload: news
})
export const updatePicturesOfCurrentNews = (newsId: string, pictures: string[]): UpdatePicturesOfCurrentNewsAction => ({
    type: UPDATE_PICTURES_OF_CURRENT_NEWS,
    payload: pictures,
    newsId
})
export const updateNewsOfPublication = (newsId: string, isPublication: boolean): UpdateNewsOfPublicationAction => ({
    type: UPDATE_NEWS_OF_PUBLICATION,
    payload: isPublication,
    newsId
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
export const getSelectedQuantity = (rootState: RootState) => getGeneral(rootState).selectedQuantity;
export const getNews = (rootState: RootState) => getGeneral(rootState).news;