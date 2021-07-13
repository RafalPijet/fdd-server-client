import { container, primaryColor } from '../../../styles/globalStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    block: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: 500,
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block"
    },
    button: {
        border: 'none',
        background: 'inherit',
        color: "inherit",
        padding: "0.9375rem",
        fontFamily: "Times New Roman",
        fontWeight: 500,
        fontSize: "12px",
        textTransform: "uppercase",
        cursor: 'pointer'
    },
    left: {
        float: 'left',
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right"
    },
    footer: {
        padding: "0.9375rem 0",
        textAlign: "center",
        display: "flex",
        zIndex: 2,
        position: "relative"
    },
    a: {
        color: primaryColor,
        textDecoration: "none",
        backgroundColor: "transparent"
    },
    footerWhiteFont: {
        "&,&:hover,&:focus": {
            color: "#FFFFFF"
        }
    },
    container,
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    icon: {
        width: "18px",
        height: "18px",
        position: "relative",
        top: "3px"
    }
}));

export interface Props {
    whiteFont?: boolean
}