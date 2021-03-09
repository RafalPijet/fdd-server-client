import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { title } from '../../../styles/globalStyles';

const messageStyle = (theme: Theme) => ({
    section: {
        padding: "70px 0"
    },
    title: {
        ...title,
        marginBottom: "50px",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        textAlign: "center",
        fontSize: "1.5em"
    },
    description: {
        color: "#999",
        textAlign: "center"
    },
    textCenter: {
        textAlign: "center"
    },
    textArea: {
        marginRight: "15px",
        marginLeft: "15px"
    }
})

export interface Props {
    isDisabled?: boolean
}

export interface StyleProps {
    section: BaseCSSProperties;
    title: BaseCSSProperties;
    description: BaseCSSProperties;
    textCenter: BaseCSSProperties;
    textArea: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(messageStyle as any);
