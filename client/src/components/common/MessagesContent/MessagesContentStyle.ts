import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MessageOptions } from '../../../types/global';
import { UserName } from '../UsersSearcher/UsersSearcherStyle';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    parentHeight: {
        height: "300px",
    },
    adminHeight: {
        height: "350px",
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
}))

export interface Props {
    dataType: Exclude<MessageOptions, MessageOptions.new>;
    isAdmin: boolean;
    isSearchMode?: boolean;
    getSelectedUser?: (item: UserName | null) => void;
}