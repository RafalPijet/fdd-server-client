import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { grayColor } from '../../../styles/globalStyles';

const parentZoneStyle = (theme: Theme) => ({
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
        marginBottom: "15px"
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
        height: '400px',
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    busy: {
        color: `${grayColor} !important`
    }
})

export interface StyleProps {
    cardHidden: BaseCSSProperties;
    cardHeader: BaseCSSProperties;
    cardFooter: BaseCSSProperties;
    selectTab: BaseCSSProperties;
    card: BaseCSSProperties;
    busy: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(parentZoneStyle as any);