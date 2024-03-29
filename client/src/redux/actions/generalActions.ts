import { Action } from 'redux';
import { RootState } from '../store';
import { GeneralState, IChildData, ChildState, UserState, NewsDataUpdate, ReportState } from '../../types/global';

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
export const UPDATE_SELECTED_PERSON_CHILD_STATUS = 'general/update_selected_person_child_status';
export const ADD_CHILD_TO_SELECTED_PERSON = 'general/add_child_to_selected_person';
export const UPDATE_SELECTED_PERSON_USER_DATA = 'general/update_selected_person_user_data';
export const SET_SELECTED_QUANTITY = 'general/set_selected_quantity';
export const SET_ALL_NEWS = 'general/set_all_news';
export const UPDATE_PICTURES_OF_CURRENT_NEWS = 'general/update_pictures_of_current_news';
export const UPDATE_NEWS_OF_PUBLICATION = 'general/update_news_of_publication';
export const UPDATE_NEWS_OF_DATA = 'general/update_news_of_data';
export const SET_CHILDREN_LIST = 'general/set_children_list';
export const SET_AVAILABLE_REPORTS_YEARS = 'general/set_available_reports_years';
export const SET_REPORTS_OF_SELECTED_YEAR = 'general/set_reports_of_selected_year';
export const UPDATE_REPORT_ITEM = 'general/update_report_item';
export const ADD_REPORT_ITEM = 'general/add_report_item';
export const REMOVE_REPORT_ITEM = 'general/remove_report_item';
export const SET_IS_FROZEN = 'general/set_is_frozen';

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
export interface UpdateSelectedPersonChildStatusAction extends Action<typeof UPDATE_SELECTED_PERSON_CHILD_STATUS> {
    isActive: boolean
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
export interface UpdateNewsOfDataAction extends Action<typeof UPDATE_NEWS_OF_DATA> {
    payload: NewsDataUpdate
}
export interface SetChildrenListAction extends Action<typeof SET_CHILDREN_LIST> {
    payload: GeneralState["childrenList"]
}
export interface SetAvailableReportsYearsAction extends Action<typeof SET_AVAILABLE_REPORTS_YEARS> {
    payload: GeneralState["availableReportsYears"]
}
export interface SetReportsOfSelectedYearAction extends Action<typeof SET_REPORTS_OF_SELECTED_YEAR> {
    payload: GeneralState["selectedYearPeriod"]
}
export interface UpdateReportItemAction extends Action<typeof UPDATE_REPORT_ITEM> {
    payload: ReportState
}
export interface AddReportItemAction extends Action<typeof ADD_REPORT_ITEM> {
    payload: ReportState
}
export interface RemoveReportItemAction extends Action<typeof REMOVE_REPORT_ITEM> {
    reportId: string
}
export interface SetIsFrozenAction extends Action<typeof SET_IS_FROZEN> {
    isFrozen: boolean
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
export const updateSelectedPersonalChildStatus = (isActive: boolean): UpdateSelectedPersonChildStatusAction => ({
    type: UPDATE_SELECTED_PERSON_CHILD_STATUS,
    isActive
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
export const updateNewsOfData = (payload: NewsDataUpdate): UpdateNewsOfDataAction => ({
    type: UPDATE_NEWS_OF_DATA,
    payload
})
export const setChildrenList = (payload: GeneralState["childrenList"]): SetChildrenListAction => ({
    type: SET_CHILDREN_LIST,
    payload
})
export const setAvailableReportsYears = (payload: GeneralState["availableReportsYears"]): SetAvailableReportsYearsAction => ({
    type: SET_AVAILABLE_REPORTS_YEARS,
    payload
})
export const setReportsOfSelectedYear = (payload: GeneralState["selectedYearPeriod"]): SetReportsOfSelectedYearAction => ({
    type: SET_REPORTS_OF_SELECTED_YEAR,
    payload
})
export const updateReportItem = (payload: ReportState): UpdateReportItemAction => ({
    type: UPDATE_REPORT_ITEM,
    payload
})
export const addReportItem = (payload: ReportState): AddReportItemAction => ({
    type: ADD_REPORT_ITEM,
    payload
})
export const removeReportItem = (reportId: string): RemoveReportItemAction => ({
    type: REMOVE_REPORT_ITEM,
    reportId
})
export const setIsFrozen = (isFrozen: boolean): SetIsFrozenAction => ({
    type: SET_IS_FROZEN,
    isFrozen
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
export const getChildrenList = (rootState: RootState) => getGeneral(rootState).childrenList;
export const getAvailableReportsYears = (rootState: RootState) => getGeneral(rootState).availableReportsYears;
export const getReportsOfSelectedYear = (rootState: RootState) => getGeneral(rootState).selectedYearPeriod;
export const getIsFrozen = (rootState: RootState) => getGeneral(rootState).isFrozen;