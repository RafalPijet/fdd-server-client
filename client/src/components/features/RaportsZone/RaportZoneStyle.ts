import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const raportZoneStyle = (theme: Theme) => ({
    root: {
        fontFamily: "Roboto",
        height: '382px',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(100px, 0, 0)"
    },
})

export interface StyleProps {
    root: BaseCSSProperties;
    cardHidden: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(raportZoneStyle as any);