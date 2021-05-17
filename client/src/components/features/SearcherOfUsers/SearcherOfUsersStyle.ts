import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
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

const searcherOfUsersStyle = (theme: Theme) => ({
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
})

export interface SelectedPerson {
    _id: string,
    name: string
}

export interface StyleProps {
    root: BaseCSSProperties;
    cardHidden: BaseCSSProperties;
    searcher: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(searcherOfUsersStyle as any);
