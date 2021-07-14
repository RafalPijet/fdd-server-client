import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { logoColor } from '../../../styles/globalStyles';

export const FddRadio = withStyles({
    root: {
        color: logoColor,
        '&$checked': {
            color: logoColor,
        },
    },
    checked: {},
})(Radio);

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        fontFamily: "Roboto",
        height: '140px',
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, 100px, 0)"
    },
    searcher: {
        backgroundColor: "rgba(166, 206, 57, 0.4)",
        padding: "30px 10px"
    }
}))

export interface SelectedPerson {
    _id: string,
    name: string
}