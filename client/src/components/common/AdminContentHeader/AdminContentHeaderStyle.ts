import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { SearchUserType } from '../../../types/global';

const adminContentHeaderStyle = (theme: Theme) => ({
    root: {
        width: "100%",
        margin: "20px auto",
        backgroundColor: "rgba(156, 39, 176, 0.8)",
        fontFamily: 'Roboto',
        padding: '10px'
    },
    header: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        minHeight: "102px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: '#fff',
        textAlign: 'center'
    },
})

export interface StyleProps {
    root: BaseCSSProperties;
    header: BaseCSSProperties;
    text: BaseCSSProperties;
}

export interface Props {
    userType: SearchUserType
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(adminContentHeaderStyle as any);