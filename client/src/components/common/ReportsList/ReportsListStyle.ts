import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor, lightGrayColor, logoColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '20px 0',
        padding: '15px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    main: {
        flexGrow: 1,
        display: 'flex',
        height: 300,
        justifyContent: 'space-between',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 210
    },
    tab: {
        backgroundColor: primaryColor,
        color: lightGrayColor
    },
    indicator: {
        backgroundColor: logoColor,
        width: 4
    }
}))