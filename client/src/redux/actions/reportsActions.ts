import { Action } from 'redux';
import { RootState } from '../store';
import { SelectedPerson } from '../../components/features/SearcherOfUsers/SearcherOfUsersStyle';

//ACTIONS NAMES
export const SET_USERS_QUANTITY = 'reports/set_users_quantity';
export const SET_CHILDREN_QUANTITY = 'reports/set_children_quantity';
export const SET_PUBLICATED_NEWS_QUANTITY = 'reports/set_publicated_news_quantity';
export const SET_INVOICES_QUANTITY = 'reports/set_invoices_quantity';
export const SET_CURRENT_YEAR_REPORT_IS_PUBLICATED = 'reports/set_current_year_report_is_publicated';
export const SET_UNPUBLICATED_CHILDREN = 'reports/set_unpublicated_children';
export const SET_PARENTS_WITHOUT_ANY_CHILDREN = 'reports/set_parents_without_any_children';

//ACTIONS TYPES
export interface SetUsersQuantityAction extends Action<typeof SET_USERS_QUANTITY> {
    quantity: number
}
export interface SetChildrenQuantityAction extends Action<typeof SET_CHILDREN_QUANTITY> {
    quantity: number
}
export interface SetPublicatedNewsQuantityAction extends Action<typeof SET_PUBLICATED_NEWS_QUANTITY> {
    quantity: number
}
export interface SetInvoicesQuantityAction extends Action<typeof SET_INVOICES_QUANTITY> {
    quantity: number
}
export interface SetCurrentYearReportIsPublicatedAction extends Action<typeof SET_CURRENT_YEAR_REPORT_IS_PUBLICATED> {
    isPublicated: boolean
}
export interface SetUnpublicatedChildrenAction extends Action<typeof SET_UNPUBLICATED_CHILDREN> {
    children: SelectedPerson[]
}
export interface SetParentsWithoutAnyChildrenAction extends Action<typeof SET_PARENTS_WITHOUT_ANY_CHILDREN> {
    parents: SelectedPerson[]
}

//CREATORS OF ACTIONS
export const setUsersQuantity = (quantity: number): SetUsersQuantityAction => ({
    type: SET_USERS_QUANTITY,
    quantity
})
export const setChildrenQuantity = (quantity: number): SetChildrenQuantityAction => ({
    type: SET_CHILDREN_QUANTITY,
    quantity
})
export const setPublicatedNewsQuantity = (quantity: number): SetPublicatedNewsQuantityAction => ({
    type: SET_PUBLICATED_NEWS_QUANTITY,
    quantity
})
export const setInvoicesQuantity = (quantity: number): SetInvoicesQuantityAction => ({
    type: SET_INVOICES_QUANTITY,
    quantity
})
export const setCurrentYearReportIsPublicated = (isPublicated: boolean): SetCurrentYearReportIsPublicatedAction => ({
    type: SET_CURRENT_YEAR_REPORT_IS_PUBLICATED,
    isPublicated
})
export const setUnpublicatedChildren = (children: SelectedPerson[]): SetUnpublicatedChildrenAction => ({
    type: SET_UNPUBLICATED_CHILDREN,
    children
})
export const setParentsWithoutAnyChildren = (parents: SelectedPerson[]): SetParentsWithoutAnyChildrenAction => ({
    type: SET_PARENTS_WITHOUT_ANY_CHILDREN,
    parents
})

//SELECTORS
export const getReports = (rootState: RootState) => rootState.reports;
export const getUsersQuantity = (rootState: RootState) => getReports(rootState).users;
export const getChildrenQuantity = (rootState: RootState) => getReports(rootState).children;
export const getPublicatedNewsQuantity = (rootState: RootState) => getReports(rootState).news;
export const getInvoicesQuantity = (rootState: RootState) => getReports(rootState).invoices;
export const getCurrentYearReportIsPublicated = (rootState: RootState) => getReports(rootState).isCurrentReport;
export const getUnpublicatedChildren = (rootState: RootState) => getReports(rootState).unpublicatedChildren;
export const getUnpublicatedChildrenQuantity = (rootState: RootState) => getReports(rootState).unpublicatedChildren.length;
export const getParentsWithoutAnyChildren = (rootState: RootState) => getReports(rootState).parentsWithoutChildren;
export const getParentsWithoutAnyChildrenQuantity = (rootState: RootState) => getReports(rootState).parentsWithoutChildren.length;
