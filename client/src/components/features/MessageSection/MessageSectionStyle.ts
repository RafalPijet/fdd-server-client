import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { title } from '../../../styles/globalStyles';

const mainTitle = title as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    section: {
        padding: "70px 100px"
    },
    title: {
        ...mainTitle,
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
}))

export interface Props {
    isDisabled?: boolean
}
