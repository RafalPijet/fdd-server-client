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
        padding: "2px 5px",
        position: "relative",
        margin: "5px 0"
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
    },
    icon: {
        backgroundColor: "rgba(166, 206, 57, 0.3)",
        borderRadius: "50%"
    },
    common: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        display: 'flex',
        alignItems: 'center'
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
    icon: BaseCSSProperties;
    common: BaseCSSProperties;
    message: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(messageItemStyle as any);