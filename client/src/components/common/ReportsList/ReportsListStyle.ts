import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: '20px 0',
        padding: '15px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
}))