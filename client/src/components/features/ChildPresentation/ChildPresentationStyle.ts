import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor } from '../../../styles/globalStyles';
import { ChildState } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(166, 206, 57, 0.8)",
        padding: '10px',
        marginTop: '20px',
        maxHeight: '550px',
        maxWidth: '1000px'
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        border: `3px solid ${primaryColor}`
    },
    childData: {
        margin: '20px 0 15px',
        backgroundColor: "rgba(166, 206, 57, 0.8)",
        color: theme.palette.common.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "130px",
        textAlign: "center",
        padding: "10px 0"
    },
    info: {
        padding: '10px',
        color: theme.palette.common.white,
        backgroundColor: "rgba(166, 206, 57, 0.8)",
        height: "385px",
        overflow: 'auto'
    },
    primaryColor: {
        color: primaryColor,
        fontWeight: 500
    }
}))

export interface Props {
    selectedChild: Omit<ChildState, "invoices" | "parent">
}