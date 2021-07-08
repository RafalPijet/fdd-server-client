import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor, lightGrayColor, logoColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '20px 0',
        padding: '15px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    tab: {
        backgroundColor: primaryColor,
        color: lightGrayColor
    },
    indicator: {
        backgroundColor: logoColor,
        width: 4
    },
    list: {
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        padding: '0 5%',
        background: 'inherit',
        height: '500px'
    },
    center: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

export interface Props {
    isAdmin: boolean;
    getSelectedReport?: (_id: string, file: File, title: string) => void;
}