import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { logoColor, grayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

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
