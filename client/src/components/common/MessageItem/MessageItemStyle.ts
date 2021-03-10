import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { logoColor } from '../../../styles/globalStyles';
import { IMessage } from '../../../types/global';

export interface Props {
    _id: IMessage["_id"];
    message: IMessage["content"];
    date: IMessage["created"];
}

const messageItemStyle = (theme: Theme) => ({
    root: {
        background: "inherit",
        color: "#fff",
        cursor: "pointer"
    },
    content: {
        fontFamily: 'Roboto',
        fontWeight: 300,
        padding: "5px",
        position: "relative",
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
        // width: '-50%'
        // hei: '80%'
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    content: BaseCSSProperties;
    unread: BaseCSSProperties;
    date: BaseCSSProperties;
    image: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(messageItemStyle as any);