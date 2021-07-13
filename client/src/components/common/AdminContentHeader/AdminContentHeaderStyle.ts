import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SearchUserType } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export interface Props {
    userType: SearchUserType
}