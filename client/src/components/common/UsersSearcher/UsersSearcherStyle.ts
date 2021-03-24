import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
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
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(userSearcherStyle as any);