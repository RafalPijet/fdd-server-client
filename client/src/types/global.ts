import { VariantType } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { SelectedPerson } from '../components/features/SearcherOfUsers/SearcherOfUsersStyle';
import { primaryColor, grayColor } from '../styles/globalStyles';

export const different = 567993596000;

export type AvailableColors =
    "primary" |
    "info" |
    "success" |
    "warning" |
    "danger" |
    "transparent" |
    "white" |
    "rose" |
    "dark" |
    "facebook" |
    "twitter" |
    "google" |
    "github" |
    "black"

export type AvailableHoverColors =
    "blackHover" |
    "primaryHover" |
    "infoHover" |
    "successHover" |
    "warningHover" |
    "dangerHover" |
    "roseHover"

export enum UserStatus {
    parent = "parent",
    admin = "admin",
    null = ""
}

export enum ServiceOptions {
    login,
    register
}

export enum MessageOptions {
    all,
    incoming,
    outcoming,
    new,
    search
}

export enum ModalAYSModes {
    null,
    removeMessage,
    changeUserStatus,
    removeNews,
    removeReport,
    removeChild,
    removeParent
}

export enum ArrowsDirection {
    null,
    up,
    down,
    left,
    right
}

export enum UpdateUserTypeData {
    all,
    password,
    data
}

export enum SearchUserType {
    child = 'child',
    parent = 'parent',
    admin = 'admin'
}

export enum AvailableDestinations {
    reports = 'reports-section',
    outsideMessage = 'outside-message',
    children = 'children-section',
    news = 'news-section',
    mainPage = 'main-page',
    mainParent = 'main-parent',
    addingImage = 'adding-image',
    removingImage = 'removing-image',
    addingInvoice = 'adding-invoice',
    childData = 'child-data',
    userData = 'user-data'
}

export interface InvoiceState {
    _id: string;
    createdAt: Date;
    uptatedAt: Date;
    description: string;
    content: string[];
}

export interface AvailableReportsYears {
    year: string;
}

export interface ReportsState {
    users: number;
    children: number;
    news: number;
    invoices: number;
    isCurrentReport: boolean;
    unpublicatedChildren: SelectedPerson[];
    parentsWithoutChildren: SelectedPerson[];
}

export interface ReportState {
    _id: string;
    createdAt: Date;
    uptatedAt: Date;
    report: string;
    title: string;
}

export interface NewsState {
    _id?: string;
    publication: boolean;
    title: string;
    content: string;
    images: string[];
    createdAt?: Date;
    uptatedAt?: Date;
}

export interface NewsDataUpdate {
    newsId: string;
    title?: string;
    content?: string;
}

export interface ChildState {
    _id: string;
    active: boolean;
    parent: string | UserState;
    firstName: string;
    lastName: string;
    birthDate: string;
    info: string;
    images: string[];
    avatar: string;
    invoices: InvoiceState[];
    createdAt?: Date;
    uptatedAt?: Date;
}

export interface ChildBasicState {
    _id: string;
    name: string;
    avatar: string;
}

export interface IChildData {
    firstName: string;
    lastName: string;
    birthDate: string;
    info: string;
}

export interface UserState {
    _id: string,
    status: UserStatus,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    children: ChildState[],
    adress: {
        zipCode: string,
        town: string,
        street: string,
        number: string
    }
}

export interface IMessage {
    content: string;
    _id: string;
    from: string;
    userName?: string | undefined;
    userEmail?: string | undefined;
    isUser?: boolean;
    to: string;
    created: string;
    new: boolean;
}

export interface IOutsideMessage {
    _id: string;
    created: string;
    name: string;
    email: string;
    content: string;
    new: boolean;
    answer?: string;
}

export interface ToastState {
    isOpen: boolean;
    content: string;
    variant: VariantType;
}

export interface ModalAvailableKeys {
    messageId?: string;
    isUser?: boolean;
    userId?: string;
    childId?: string;
    userStatus?: UserStatus;
    newsStatus?: NewsState;
    reportId?: string;
}

export interface ModalAreYouSure {
    mode: ModalAYSModes;
    isOpen: boolean;
    title: string;
    description: string;
    data: ModalAvailableKeys;
}

export interface MessageState {
    messages: IMessage[];
    quantity: number;
}

export interface EventChangeReplyData {
    userId?: string;
    messageId?: string;
    name: string;
    email?: string;
}

export interface EventChangeAvailableDestination {
    actionName: AvailableDestinations
}

export interface EventChange {
    isAction: boolean;
    data?: EventChangeReplyData | EventChangeAvailableDestination;
}

export interface GeneralState {
    toast: ToastState;
    modalAreYouSure: ModalAreYouSure;
    isRemoved: boolean;
    isOpen: boolean;
    eventChange: EventChange;
    selectedChild: string | null;
    selectedPerson: any;
    selectedUserType: SearchUserType;
    selectedQuantity: number | null;
    news: NewsState[] | null;
    childrenList: ChildBasicState[] | null;
    availableReportsYears: AvailableReportsYears[];
    selectedYearPeriod: ReportState[] | null;
    isFrozen: boolean;
}

export enum TargetOptions {
    from = 'from',
    to = 'to',
    all = 'all'
}

export const FddSwitch = withStyles({
    switchBase: {
        color: grayColor,
        '&$checked': {
            color: primaryColor,
        },
        '&$checked + $track': {
            backgroundColor: primaryColor,
        },
    },
    checked: {},
    track: {},
})(Switch);

export const CssTextField = withStyles({
    root: {
        '& .MuiAutocomplete-inputRoot': {
            color: '#fff',
        },
        '& label': {
            color: '#fff',
            fontSize: "0.8rem",
        },
        '& .MuiSvgIcon-root': {
            color: '#fff',
        },
        '& label.Mui-focused': {
            color: '#fff',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#fff',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#fff',
        },
    },
})(TextField);

export const FddTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: primaryColor,
        color: '#fff',
        boxShadow: theme.shadows[2],
        fontSize: 12,
    },
}))(Tooltip);