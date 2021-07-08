import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { logoColor, primaryColor, lightGrayColor } from '../../../styles/globalStyles';
import { ReportState } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '10px 0',
        padding: 5,
        cursor: 'pointer',
        width: '100%',
        backgroundColor: '#B86DC5',
        color: lightGrayColor
    },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        color: logoColor,
        fontSize: '3rem'
    },
    selected: {
        backgroundColor: primaryColor,
        color: '#fff'
    }
}))

export interface Props {
    report: ReportState;
    selectedReport: string;
    getSelectedItem: (_id: string, url: string, title: string) => void;
}