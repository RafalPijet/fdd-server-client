import { container, primaryColor } from '../../../styles/globalStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { UserStatus } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        ...container,
        zIndex: 2,
        position: "relative",
        paddingTop: "20vh",
        color: "#FFFFFF",
        paddingBottom: "200px"
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, -60px, 0)"
    },
    pageHeader: {
        minHeight: "100vh",
        height: "auto",
        display: "inherit",
        position: "relative",
        margin: "0",
        padding: "0",
        border: "0",
        alignItems: "center",
        "&:before": {
            background: "rgba(0, 0, 0, 0.5)"
        },
        "&:before,&:after": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: '""'
        },
        "& footer li a,& footer li a:hover,& footer li a:active": {
            color: "#FFFFFF"
        },
        "& footer": {
            position: "absolute",
            bottom: "0",
            width: "100%"
        }
    },
    resetBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    resetSize: {
        fontSize: `10px !important`
    },
    resetPending: {
        cursor: 'progress'
    },
    reset: {
        color: `${primaryColor} !important`,
    },
    form: {
        margin: "0 auto",
    },
    cardHeader: {
        maxWidth: "320px",
        width: "auto",
        textAlign: "center",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "-40px",
        padding: "20px 0",
        marginBottom: "15px"
    },
    socialIcons: {
        maxWidth: "24px",
        marginTop: "0",
        width: "100%",
        transform: "none",
        left: "0",
        top: "0",
        height: "100%",
        lineHeight: "41px",
        fontSize: "20px"
    },
    divider: {
        marginTop: "30px",
        marginBottom: "0px",
        textAlign: "center"
    },
    cardFooter: {
        paddingTop: "0rem",
        border: "0",
        borderRadius: "6px",
        justifyContent: "center !important"
    },
    socialLine: {
        marginTop: "1rem",
        textAlign: "center",
        padding: "0"
    },
    inputIconsColor: {
        color: "#495057"
    }
}))

export interface IUserRegister {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    zipCode: string;
    town: string;
    street: string;
    number: string;
}

export interface IUserToSend extends IUserRegister {
    status: UserStatus
}

export class Register implements Omit<IUserRegister, 'confirmPassword'> {
    constructor(
        public firstName: string,
        public lastName: string,
        public phone: string,
        public email: string,
        public password: string,
        public zipCode: string,
        public town: string,
        public street: string,
        public number: string,
    ) { }

    prepare(): void {
        this.phone = this.phone
            .replaceAll('-', '')
            .replace('(', '')
            .replace(')', '')
            .replace('+', '')
            .replace(' ', '')
        this.zipCode = this.zipCode.replace('-', '');
    }

    getContent(): Omit<IUserToSend, 'confirmPassword'> {
        return {
            status: UserStatus.parent,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            password: this.password,
            zipCode: this.zipCode,
            town: this.town,
            street: this.street,
            number: this.number
        }
    }
}

export interface IUserLogin {
    email: string;
    password: string;
}