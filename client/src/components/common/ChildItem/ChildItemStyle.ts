import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ChildBasicState } from '../../../types/global';
import { primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(166, 206, 57, 0.5)",
        padding: '7px',
        marginTop: '20px',
        height: '55px',
        width: '200px',
        cursor: 'pointer'
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    names: {
        fontSize: '0.9rem',
        color: primaryColor,
        fontWeight: 500,
        padding: '0 10px 0 6px'
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 1)"
    },
    disabled: {
        backgroundColor: 'rgba(153, 153, 153, 0.5)',
        cursor: 'progress'
    }
}))

export interface Props {
    childItem: ChildBasicState
}