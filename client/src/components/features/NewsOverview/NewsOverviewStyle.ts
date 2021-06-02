import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { NewsState } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        margin: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        padding: '10px',
    }
}))

export interface Props {
    news: NewsState[]
}