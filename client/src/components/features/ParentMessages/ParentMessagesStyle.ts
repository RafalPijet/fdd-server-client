import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, -60px, 0)"
    },
    cardHeader: {
        minWidth: "400px",
        width: "auto",
        textAlign: "center",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "-40px",
        padding: "20px 0",
    },
    cardFooter: {
        paddingTop: "0rem",
        border: "0",
        borderRadius: "6px",
        justifyContent: "center !important"
    },
    selectTab: {
        paddingTop: "5px",
        fontSize: ".75rem !important"
    },
    card: {
        height: '450px',
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    busy: {
        color: `${grayColor} !important`
    }
}))