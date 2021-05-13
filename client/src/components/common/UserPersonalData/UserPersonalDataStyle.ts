import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { UserState, AvailableDestinations } from '../../../types/global';
import { primaryColor } from '../../../styles/globalStyles';

const userPersonalDataStyle = (theme: Theme) => ({
    root: {
        minHeight: '490px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    inputIconsColor: {
        color: "#495057"
    },
    switch: {
        color: primaryColor
    },
    parent: {
        padding: "0 8px",
        color: primaryColor,
        fontSize: "1rem",
        fontFamily: "Roboto",
        fontWeight: "400"
    },
    footer: {
        display: "flex",
        justifyContent: "space-around",
        minWidth: "50%"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    active: BaseCSSProperties;
    inputIconsColor: BaseCSSProperties;
    switch: BaseCSSProperties;
    parent: BaseCSSProperties;
    footer: BaseCSSProperties;
}

export interface Props {
    isAdmin: boolean;
    user: UserState;
    name: AvailableDestinations;
}

export interface UserDataProps {
    firstNameUser: string;
    lastNameUser: string;
    newPassword: string
    confirmPassword: string;
    oldPassword: string;
    email: string;
    phone: string;
    zipCode: string;
    town: string;
    street: string;
    number: string;
}

export const emptyUserData = {
    firstNameUser: '',
    lastNameUser: '',
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
    email: '',
    phone: '',
    zipCode: '',
    town: '',
    street: '',
    number: '',
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(userPersonalDataStyle as any);