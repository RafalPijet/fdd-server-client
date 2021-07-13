import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardBody: {
        padding: '0.9375rem 1.875rem',
        flex: '1 1 auto',
    },
}));