export enum TargetOptions {
    from = 'from',
    to = 'to',
    all = 'all'
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