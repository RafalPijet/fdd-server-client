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

export interface ChildState {
    firstName: string;
    lastName: string;
    birthDate: Date;
    info: string;
    images: string[];
}

export interface UserState {
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