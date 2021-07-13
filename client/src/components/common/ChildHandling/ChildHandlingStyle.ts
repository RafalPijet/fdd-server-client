import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import image from '../../../images/sign.jpg';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: "2970px",
        flexDirection: "column",
        padding: "15px",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        margin: "0",
        border: "0",
        display: "flex",
        alignItems: "center",
        backgroundImage: "url(" + image + ")"
    },
    inputIconsColor: {
        color: "#495057"
    }
}))