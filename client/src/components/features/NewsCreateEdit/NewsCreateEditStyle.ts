import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { NewsState } from '../../../types/global';
import { primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: '0 10px',
        padding: '0 10px',
    },
    typingArea: {
        backgroundColor: "rgba(166, 206, 57, 0.8)",
        margin: '30px 0',
        padding: '8px 10px',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    switchLabel: {
        color: primaryColor,
        fontWeight: 600
    },
}))

export interface Props {
    currentNews: NewsState | null;
}