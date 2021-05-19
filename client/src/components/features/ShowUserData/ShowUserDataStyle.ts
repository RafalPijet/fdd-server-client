import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { UserState } from '../../../types/global';
import { logoColor } from '../../../styles/globalStyles';

const showUserDataStyle = (theme: Theme) => ({
    root: {
        backgroundColor: "rgba(156, 39, 176, 0.8)",
        fontFamily: 'Roboto'
    },
    basicData: {
        width: "100%",
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-around'
    },
    title: {
        display: 'inline-flex',
        color: logoColor,
        fontSize: '12px',
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    basicData: BaseCSSProperties;
    title: BaseCSSProperties;
}

export interface Props {
    user: UserState;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(showUserDataStyle as any);