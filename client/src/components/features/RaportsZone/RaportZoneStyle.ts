import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Socket } from 'socket.io-client';
import { lightGrayColor } from '../../../styles/globalStyles';

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
    cardBody: {
        color: 'rgba(166, 206, 57, .7)'
    },
    content: {
        color: lightGrayColor
    },
    pending: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        backgroundColor: "rgba(166, 206, 57, 0.2)",
        height: 48,
        overflowY: 'scroll',
        padding: '0 2px'
    }
}))

export interface Props {
    socket?: Socket
}