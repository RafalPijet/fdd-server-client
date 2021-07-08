import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '20px 0',
        padding: '15px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    edit: {
        color: primaryColor,
    },
    switch: {
        marginLeft: 50
    }
}))

export interface Props {
    reportToEdit: { _id: string, file: File, title: string } | null;
}