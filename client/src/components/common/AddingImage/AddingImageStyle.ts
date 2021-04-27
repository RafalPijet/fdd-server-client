import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import { grayColor, primaryBoxShadow, primaryColor } from '../../../styles/globalStyles';

const addingImageStyle = (theme: Theme) => ({
    root: {
        minHeight: '450px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    preview: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '210px',
        width: '100%',
        marginTop: '10px',
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    activePreview: {
        backgroundColor: "rgba(255, 255, 255, 0.4) !important"
    },
    avatar: {
        color: primaryColor,
        fontWeight: 600
    },
    arrowsBox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    upDown: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    preview: BaseCSSProperties;
    active: BaseCSSProperties;
    activePreview: BaseCSSProperties;
    avatar: BaseCSSProperties;
    arrowsBox: BaseCSSProperties;
    upDown: BaseCSSProperties;
}

export const OperationButton = withStyles({
    root: {
        color: "#fff",
        backgroundColor: primaryColor,
        margin: "0 10px",
        padding: "8px",
        maxHeight: "50px",
        maxWidth: "50px",
        '&:hover': {
            backgroundColor: "#9F63DC",
            borderColor: "#9F63DC",
            boxShadow: primaryBoxShadow,
        },
    }
})(IconButton)

export const ArrowButton = withStyles({
    root: {
        color: "#fff",
        backgroundColor: primaryColor,
        margin: "1px",
        padding: "5px",
        maxHeight: "23px",
        maxWidth: "23px",
        '&:hover': {
            backgroundColor: "#9F63DC",
            borderColor: "#9F63DC",
            boxShadow: primaryBoxShadow,
        },
    }
})(IconButton)

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

export interface Props {
    childId: string | null;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(addingImageStyle as any);