import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { logoColor, grayColor } from '../../../styles/globalStyles';

const userSearcherStyle = (theme: Theme) => ({
    root: {
        width: "inherit",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        width: 300
    },
    label: {
        fontSize: "0.8rem",
        color: "#fff"
    },
    disabled: {
        color: grayColor
    }
})

export const FddSwitch = withStyles({
    switchBase: {
        color: grayColor,
        '&$checked': {
            color: logoColor,
        },
        '&$checked + $track': {
            backgroundColor: logoColor,
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

export interface StyleProps {
    root: BaseCSSProperties;
    input: BaseCSSProperties;
    label: BaseCSSProperties;
    disabled: BaseCSSProperties;
}

export interface UserName {
    _id: string;
    name: string;
    email?: string;
}

export interface Props {
    label: string;
    api: string;
    getSelectedItem: (item: UserName | null) => void;
    isDisabled: boolean;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(userSearcherStyle as any);