import { VariantType } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
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
    removeMessage
}

export enum ArrowsDirection {
    null,
    up,
    down,
    left,
    right
}

export interface InvoiceState {
    _id: string;
    addDate: Date;
    description: string;
    content: string[];
}

export interface ChildState {
    _id: string;
    parent: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    info: string;
    images: string[];
    avatar: string;
    invoices: InvoiceState[];
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

export interface EventChange {
    isAction: boolean;
    data?: EventChangeReplyData;
}

export interface GeneralState {
    toast: ToastState;
    modalAreYouSure: ModalAreYouSure;
    isRemoved: boolean;
    isOpen: boolean;
    eventChange: EventChange;
    selectedChild: string | null;
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