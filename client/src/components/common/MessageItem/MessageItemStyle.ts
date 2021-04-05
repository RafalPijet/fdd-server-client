import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { logoColor } from '../../../styles/globalStyles';
import { IMessage, MessageOptions } from '../../../types/global';

export interface Props {
    _id: IMessage["_id"];
    message: IMessage["content"];
    date: IMessage["created"];
    isNew: IMessage["new"];
    getData: (
        id: string,
        content: string,
        isNew: boolean,
        userName: string | undefined,
        userEmail: string | undefined,
        isAdminMessage: boolean,
        isUser: boolean | undefined,
        fromId: string | undefined
    ) => void;
    selectedId: string;
    dataType: Exclude<MessageOptions, MessageOptions.new>;
    from: string;
    userName: string | undefined;
    userEmail: string | undefined;
    isUser?: boolean
}

const messageItemStyle = (theme: Theme) => ({
    root: {
        background: "inherit",
        color: "#fff",
        cursor: "pointer"
    },
    selected: {
        background: "rgba(255, 255, 255, 0.2)"
    },
    content: {
        fontFamily: 'Roboto',
        fontWeight: 300,
        padding: "5px",
        position: "relative",
        margin: "7px 0"
    },
    right: {
        textAlign: 'right'
    },
    unread: {
        fontWeight: 600
    },
    date: {
        color: logoColor,
        fontSize: "10px",
        paddingRight: "5px",
    },
    image: {
        position: "absolute",
        top: -8,
        left: -12,
        height: "80%"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    content: BaseCSSProperties;
    right: BaseCSSProperties;
    unread: BaseCSSProperties;
    date: BaseCSSProperties;
    image: BaseCSSProperties;
    selected: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(messageItemStyle as any);