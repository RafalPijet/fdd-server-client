import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { container, title } from '../../../styles/globalStyles';

const adminPageStyle = (theme: Theme) => ({
    container: {
        zIndex: "12",
        color: "#FFFFFF",
        ...container
    },
    title: {
        ...title,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: "#FFFFFF",
        textDecoration: "none"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    }
})

export interface StyleProps {
    container: BaseCSSProperties;
    title: BaseCSSProperties;
    subtitle: BaseCSSProperties;
    main: BaseCSSProperties;
    mainRaised: BaseCSSProperties
}

export const useStyles = makeStyles(adminPageStyle as any);