import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: '0.9375rem 1.875rem',
    },
}));