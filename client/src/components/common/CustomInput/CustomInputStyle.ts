import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { InputLabelProps, InputProps, FormControlProps } from '@material-ui/core';
import { primaryColor, dangerColor, successColor, defaultFont } from '../../../styles/globalStyles';

const customInputStyle = (theme: Theme) => ({
    disabled: {
        "&:before": {
            borderColor: "transparent !important"
        }
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#D2D2D2 !important",
            borderWidth: "1px !important"
        },
        "&:after": {
            borderColor: primaryColor
        }
    },
    underlineError: {
        "&:after": {
            borderColor: dangerColor
        }
    },
    underlineSuccess: {
        "&:after": {
            borderColor: successColor
        }
    },
    whiteUnderline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#FFFFFF"
        },
        "&:after": {
            borderColor: "#FFFFFF"
        }
    },
    labelRoot: {
        ...defaultFont,
        color: "#AAAAAA !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        top: "10px",
        letterSpacing: "unset",
        "& + $underline": {
            marginTop: "0px"
        }
    },
    labelRootError: {
        color: dangerColor + " !important"
    },
    labelRootSuccess: {
        color: successColor + " !important"
    },
    formControl: {
        margin: "0 0 17px 0",
        paddingTop: "27px",
        position: "relative",
        "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
            color: "#495057"
        }
    },
    input: {
        color: "#495057",
        height: "unset",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        }
    },
    whiteInput: {
        "&,&::placeholder": {
            color: "#FFFFFF",
            opacity: "1"
        }
    }
});

export interface Props {
    labelText: string;
    labelProps?: InputLabelProps;
    id: string;
    inputProps?: InputProps;
    formControlProps?: FormControlProps;
    inputRootCustomClasses?: any;
    error?: boolean;
    success?: boolean;
    white?: boolean;
}

export interface StyleProps {
    disabled: BaseCSSProperties;
    underline: BaseCSSProperties;
    underlineError: BaseCSSProperties;
    underlineSuccess: BaseCSSProperties;
    whiteUnderline: BaseCSSProperties
    labelRoot: BaseCSSProperties
    labelRootError: BaseCSSProperties
    labelRootSuccess: BaseCSSProperties
    formControl: BaseCSSProperties
    input: BaseCSSProperties
    whiteInput: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(customInputStyle as any);