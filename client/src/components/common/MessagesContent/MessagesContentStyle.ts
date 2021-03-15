import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { MessageOptions } from '../../../types/global';

const messagesContentStyle = (theme: Theme) => ({
    root: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    window: {
        background: "inherit",
        color: "#fff"
    },
    content: {
        fontFamily: "Roboto",
        paddingLeft: "5px",
        paddingRight: "5px",
        textAlign: "justify",
        overflow: "auto",
        height: "80px",
        margin: "5px 0"
    },
    list: {
        height: "200px",
        overflow: "auto",
        padding: "0 12px"
    }
})

export interface Props {
    dataType: Exclude<MessageOptions, MessageOptions.new>
}

export interface StyleProps {
    root: BaseCSSProperties;
    window: BaseCSSProperties;
    content: BaseCSSProperties;
    list: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(messagesContentStyle as any);