import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor, lightGrayColor, logoColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '20px 0',
        padding: '15px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    title: {
        margin: '10px 0 20px',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: primaryColor
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '100%',
        height: 230
    },
    box: {
        backgroundColor: "rgba(166, 206, 57, 0.7)",
        height: 230,
        padding: 5
    },
    preview: {
        width: 'fit-content',
        padding: 10
    },
    tab: {
        backgroundColor: primaryColor,
        color: lightGrayColor
    },
    indicator: {
        backgroundColor: logoColor,
        width: 4
    },
    pending: {
        cursor: 'progress'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        padding: '0 5%',
        background: 'inherit',
        height: '500px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export interface Props {
    isAdmin: boolean;
    getSelectedReport?: (_id: string, file: File, title: string) => void;
}