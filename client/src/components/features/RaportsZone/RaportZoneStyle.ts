import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        fontFamily: "Roboto",
        height: '382px',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(100px, 0, 0)"
    },
}))