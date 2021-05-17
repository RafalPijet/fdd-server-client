import { IChild } from './models';

export enum TargetOptions {
    from = 'from',
    to = 'to',
    all = 'all'
}

export enum UserStatus {
    parent = "parent",
    admin = "admin",
    null = ""
}

export interface IAdminMessage {
    _id: any;
    isUser: boolean;
    content: string;
    from: string | undefined;
    userName: string;
    userEmail: string;
    new: boolean;
    to: string;
    created: Date;
    answer: string | undefined
}

export interface UserDataDTO {
    _id: string,
    status: UserStatus,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    children?: IChild[],
    adress: {
        zipCode: string,
        town: string,
        street: string,
        number: string
    }
}

export enum SearchUserType {
    child = 'child',
    parent = 'parent',
    admin = 'admin'
}