import { Theme, makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { ChildState, AvailableDestinations } from '../../../types/global';
import { primaryBoxShadow, primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '450px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    preview: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '210px',
        width: '100%',
        marginTop: '10px',
    },
    previewContent: {
        minWidth: "261px",
        minHeight: "176px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px'
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
}))

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

export interface Props {
    childId: string | null;
    selectedChild: ChildState | undefined;
    name: AvailableDestinations;
    newsId?: string;
    isExistChild: boolean;
    helpText: string;
    isAvatarAvailable: boolean;
}
