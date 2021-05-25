import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { UserState } from '../../../types/global';
import { logoColor } from '../../../styles/globalStyles';

const showUserDataStyle = (theme: Theme) => ({
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
})

export interface StyleProps {
    root: BaseCSSProperties;
    header: BaseCSSProperties;
    title: BaseCSSProperties;
    alignBaseline: BaseCSSProperties;
    alignCenter: BaseCSSProperties;
    text: BaseCSSProperties;
    email: BaseCSSProperties;
    childZone: BaseCSSProperties;
}

export interface Props {
    user: UserState;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(showUserDataStyle as any);