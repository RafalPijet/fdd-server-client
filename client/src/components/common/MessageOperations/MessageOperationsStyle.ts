import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { logoColor, roseColor } from '../../../styles/globalStyles';
import { MessageOptions } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontFamily: "Roboto",
        width: 'inherit',
        padding: '5px 10px'
    },
    direction: {
        color: "#fff",
        fontSize: "12px",
        paddingRight: "5px"
    },
    buttonDelete: {
        padding: "0 5px",
        color: roseColor
    },
    buttonReply: {
        padding: "0 5px",
        color: "#fff"
    },
    userInfo: {
        margin: "0",
        color: logoColor,
        width: "fit-content"
    }
}))

export interface Props {
    isUser: boolean | undefined;
    userName: string;
    userEmail: string;
    messageId: string;
    dataType: Exclude<MessageOptions, MessageOptions.new>;
    isAdminMessage: boolean;
    fromId: string | undefined;
}
