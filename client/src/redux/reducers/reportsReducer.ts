import {
    SET_USERS_QUANTITY,
    SET_CHILDREN_QUANTITY,
    SET_PUBLICATED_NEWS_QUANTITY,
    SET_INVOICES_QUANTITY,
    SET_CURRENT_YEAR_REPORT_IS_PUBLICATED,
    SET_UNPUBLICATED_CHILDREN,
    SET_PARENTS_WITHOUT_ANY_CHILDREN,
    SetUsersQuantityAction,
    SetChildrenQuantityAction,
    SetPublicatedNewsQuantityAction,
    SetInvoicesQuantityAction,
    SetCurrentYearReportIsPublicatedAction,
    SetUnpublicatedChildrenAction,
    SetParentsWithoutAnyChildrenAction
} from '../actions/reportsActions';
import { ReportsState } from '../../types/global';

const initialState: ReportsState = {
    users: 0,
    children: 0,
    news: 0,
    invoices: 0,
    isCurrentReport: false,
    unpublicatedChildren: [],
    parentsWithoutChildren: []
}

const reportsReducer = (
    state: ReportsState = initialState,
    action: SetUsersQuantityAction | SetChildrenQuantityAction | SetPublicatedNewsQuantityAction |
        SetInvoicesQuantityAction | SetCurrentYearReportIsPublicatedAction | SetUnpublicatedChildrenAction |
        SetParentsWithoutAnyChildrenAction
) => {
    switch (action.type) {
        case SET_USERS_QUANTITY:
            return { ...state, users: action.quantity }
        case SET_CHILDREN_QUANTITY:
            return { ...state, children: action.quantity }
        case SET_PUBLICATED_NEWS_QUANTITY:
            return { ...state, news: action.quantity }
        case SET_INVOICES_QUANTITY:
            return { ...state, invoices: action.quantity }
        case SET_CURRENT_YEAR_REPORT_IS_PUBLICATED:
            return { ...state, isCurrentReport: action.isPublicated }
        case SET_UNPUBLICATED_CHILDREN:
            return { ...state, unpublicatedChildren: action.children }
        case SET_PARENTS_WITHOUT_ANY_CHILDREN:
            return { ...state, parentsWithoutChildren: action.parents }
        default:
            return { ...state };
    }
}

export default reportsReducer;