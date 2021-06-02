import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { NewsState } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        margin: '0 10px',
        padding: '0 10px',
    }
}))

export interface Props {
    currentNews: NewsState | null;
}