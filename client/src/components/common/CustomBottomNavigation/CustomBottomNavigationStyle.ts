import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    busy: {
        color: `${grayColor} !important`,
    },
    normal: {
        paddingTop: '5px',
        fontSize: '.75rem !important',
        color: '#fff',
    },
}))