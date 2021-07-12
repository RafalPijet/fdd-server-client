import {
    SET_TOAST,
    SetToastAction,
    SET_MODAL_ARE_YOU_SURE,
    SetModalAreYouSure,
    SET_IS_REMOVED,
    SetIsRemoved,
    SET_IS_OPEN,
    SetIsOpen,
    SET_EVENT_CHANGE,
    SetEventChange,
    SET_SELECTED_CHILD,
    SetSelectedChild,
    SET_SELECTED_PERSON,
    SetSelectedPersonAction,
    SET_SELECTED_USER_TYPE,
    SetSelectedUserTypeAction,
    UPDATE_SELECTED_PERSON_CHILD_DATA,
    UpdateSelectedPersonChildDataAction,
    UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST,
    UpdateSelectedPersonChildImagesListAction,
    UPDATE_SELECTED_PERSON_CHILD_AVATAR,
    UpdateSelectedPersonChildAvatarAction,
    ADD_CHILD_TO_SELECTED_PERSON,
    AddChildToSelectedPersonAction,
    UPDATE_SELECTED_PERSON_USER_DATA,
    UpdateSelectedPersonUserDataAction,
    SET_SELECTED_QUANTITY,
    SetSelectedQuantityAction,
    UPDATE_SELECTED_PERSON_CHILD_INVOICES_LIST,
    UpdateSelectedPersonChildInvoicesListAction,
    SET_ALL_NEWS,
    SetAllNewsAction,
    UPDATE_PICTURES_OF_CURRENT_NEWS,
    UpdatePicturesOfCurrentNewsAction,
    UPDATE_NEWS_OF_PUBLICATION,
    UpdateNewsOfPublicationAction,
    UPDATE_NEWS_OF_DATA,
    UpdateNewsOfDataAction,
    SET_CHILDREN_LIST,
    SetChildrenListAction,
    SET_AVAILABLE_REPORTS_YEARS,
    SetAvailableReportsYearsAction,
    SET_REPORTS_OF_SELECTED_YEAR,
    SetReportsOfSelectedYearAction,
    UPDATE_REPORT_ITEM,
    UpdateReportItemAction,
    ADD_REPORT_ITEM,
    AddReportItemAction,
    REMOVE_REPORT_ITEM,
    RemoveReportItemAction
} from '../actions/generalActions';
import { GeneralState, ModalAYSModes, NewsState, ReportState, SearchUserType } from '../../types/global';

const initialState: GeneralState = {
    toast: {
        isOpen: false,
        content: '',
        variant: "success"
    },
    modalAreYouSure: {
        mode: ModalAYSModes.null,
        isOpen: false,
        title: "",
        description: "",
        data: {}
    },
    isRemoved: false,
    isOpen: false,
    eventChange: {
        isAction: false,
        data: undefined
    },
    selectedChild: null,
    selectedPerson: null,
    selectedUserType: SearchUserType.child,
    selectedQuantity: null,
    news: null,
    childrenList: null,
    availableReportsYears: [],
    selectedYearPeriod: null
}

const generalReducer = (
    state: GeneralState = initialState,
    action: SetToastAction | SetModalAreYouSure | SetIsRemoved | SetIsOpen | UpdateNewsOfPublicationAction |
        SetEventChange | SetSelectedChild | SetSelectedPersonAction | SetSelectedUserTypeAction |
        UpdateSelectedPersonChildDataAction | UpdateSelectedPersonChildImagesListAction |
        UpdateSelectedPersonChildAvatarAction | AddChildToSelectedPersonAction | SetAllNewsAction |
        UpdateSelectedPersonUserDataAction | SetSelectedQuantityAction | UpdateNewsOfDataAction |
        UpdateSelectedPersonChildInvoicesListAction | UpdatePicturesOfCurrentNewsAction |
        SetChildrenListAction | SetAvailableReportsYearsAction | SetReportsOfSelectedYearAction |
        UpdateReportItemAction | AddReportItemAction | RemoveReportItemAction
) => {
    switch (action.type) {
        case SET_TOAST:
            return { ...state, toast: action.payload };
        case SET_MODAL_ARE_YOU_SURE:
            return { ...state, modalAreYouSure: action.payload };
        case SET_IS_REMOVED:
            return { ...state, isRemoved: action.payload };
        case SET_IS_OPEN:
            return { ...state, isOpen: action.payload };
        case SET_EVENT_CHANGE:
            return { ...state, eventChange: action.payload };
        case SET_SELECTED_CHILD:
            return { ...state, selectedChild: action.payload };
        case SET_SELECTED_PERSON:
            return { ...state, selectedPerson: action.payload };
        case SET_SELECTED_USER_TYPE:
            return { ...state, selectedUserType: action.payload };
        case UPDATE_SELECTED_PERSON_CHILD_DATA:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    birthDate: action.payload.birthDate,
                    info: action.payload.info
                }
            }
        case UPDATE_SELECTED_PERSON_CHILD_IMAGES_LIST:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    images: action.payload
                }
            }
        case UPDATE_SELECTED_PERSON_CHILD_AVATAR:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    avatar: action.payload
                }
            }
        case ADD_CHILD_TO_SELECTED_PERSON:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    children: [...state.selectedPerson.children, action.payload]
                }
            }
        case UPDATE_SELECTED_PERSON_USER_DATA:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    email: action.payload.email,
                    phone: action.payload.phone,
                    adress: action.payload.adress
                }
            }
        case SET_SELECTED_QUANTITY:
            return {
                ...state,
                selectedQuantity: action.payload
            }
        case UPDATE_SELECTED_PERSON_CHILD_INVOICES_LIST:
            return {
                ...state,
                selectedPerson: {
                    ...state.selectedPerson,
                    invoices: action.payload
                }
            }
        case SET_ALL_NEWS:
            return {
                ...state,
                news: action.payload
            }
        case UPDATE_PICTURES_OF_CURRENT_NEWS:
            if (state.news !== null) {
                return {
                    ...state,
                    news: state.news.map((item: NewsState) => {
                        if (item._id === action.newsId) {
                            item.images = action.payload
                        }
                        return item;
                    })
                }
            } else {
                return { ...state };
            }
        case UPDATE_NEWS_OF_PUBLICATION:
            if (state.news !== null) {
                return {
                    ...state,
                    news: state.news.map((item: NewsState) => {
                        if (item._id === action.newsId) {
                            item.publication = action.payload
                        }
                        return item;
                    })
                }
            } else {
                return { ...state };
            }
        case UPDATE_NEWS_OF_DATA:
            if (state.news !== null) {
                return {
                    ...state,
                    news: state.news.map((item: NewsState) => {
                        if (item._id === action.payload.newsId) {
                            if (action.payload.title !== undefined) {
                                item.title = action.payload.title
                            }
                            if (action.payload.content !== undefined) {
                                item.content = action.payload.content
                            }
                        }
                        return item;
                    })
                }
            } else {
                return { ...state }
            }
        case SET_CHILDREN_LIST:
            return {
                ...state,
                childrenList: action.payload
            }
        case SET_AVAILABLE_REPORTS_YEARS:
            return {
                ...state,
                availableReportsYears: action.payload
            }
        case SET_REPORTS_OF_SELECTED_YEAR:
            return {
                ...state,
                selectedYearPeriod: action.payload
            }
        case UPDATE_REPORT_ITEM:
            if (state.selectedYearPeriod !== null) {
                return {
                    ...state,
                    selectedYearPeriod: state.selectedYearPeriod.map((item: ReportState) => {
                        if (item._id === action.payload._id) {
                            item.report = action.payload.report;
                            item.title = action.payload.title
                        }
                        return item;
                    })
                }
            } else {
                return { ...state }
            }
        case ADD_REPORT_ITEM:
            if (state.selectedYearPeriod !== null) {
                return {
                    ...state,
                    selectedYearPeriod: [...state.selectedYearPeriod, action.payload]
                }
            } else {
                return { ...state }
            }
        case REMOVE_REPORT_ITEM:
            if (state.selectedYearPeriod !== null) {
                return {
                    ...state,
                    selectedYearPeriod: state.selectedYearPeriod.filter((item: ReportState) => item._id !== action.reportId)
                }
            } else {
                return { ...state }
            }
        default:
            return { ...state }
    }
}

export default generalReducer;