import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { container, title } from '../../../styles/globalStyles';

const mainTitle = title as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        zIndex: 12,
        color: "#FFFFFF",
        ...container
    },
    title: {
        ...mainTitle,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none",
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: 3
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
}))
