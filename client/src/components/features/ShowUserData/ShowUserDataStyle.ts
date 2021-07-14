import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { UserState } from '../../../types/global';
import { logoColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: "20px auto",
        backgroundColor: "rgba(156, 39, 176, 0.8)",
        fontFamily: 'Roboto',
        padding: '10px'
    },
    header: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    title: {
        display: 'inline-flex',
        color: logoColor,
        fontSize: '12px',
    },
    alignBaseline: {
        alignItems: 'baseline',
    },
    alignCenter: {
        alignItems: 'center'
    },
    text: {
        paddingLeft: '5px',
        color: '#fff'
    },
    email: {
        fontSize: '1.25rem',
        textDecoration: 'none'
    },
    childZone: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        maxWidth: '580px',
        margin: '80px auto',
        padding: '70px 100px'
    }
}))

export interface Props {
    user: UserState;
}