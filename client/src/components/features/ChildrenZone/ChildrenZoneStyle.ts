import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { logoColor, dangerColor, warningColor } from '../../../styles/globalStyles';
import { ChildState } from '../../../types/global';

const childrenZoneStyle = (theme: Theme) => ({
    root: {
        fontFamily: "Roboto",
        height: '500px',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    cardHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "180px",
        height: "160px",
        textAlign: "center",
        marginLeft: "-60px",
        marginRight: "20px",
        marginTop: "-40px",
        padding: "10px 0",
    },
    rowHeader: {
        position: 'relative',
        display: "flex",
        margin: 0
    },
    statusRow: {
        fontSize: '12px',
        color: "#fff",
        position: 'absolute',
        top: '-20px',
        right: 0
    },
    status: {
        paddingLeft: '5px',
        fontSize: '16px'
    },
    active: {
        color: logoColor
    },
    inactive: {
        color: warningColor
    },
    none: {
        color: dangerColor
    },
    description: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-end",
        justifyContent: "space-between",
        width: "404px",
        height: "107px",
        textAlign: "center",
        marginLeft: "-5px",
        padding: "10px 0",
        overflow: "auto"
    },
    content: {
        margin: 0,
        padding: "0 5px",
        textAlign: "justify"
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        boxShadow:
            "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(80px, 0, 0)"
    },
})

export interface StyleProps {
    root: BaseCSSProperties;
    cardHeader: BaseCSSProperties;
    small: BaseCSSProperties;
    large: BaseCSSProperties;
    rowHeader: BaseCSSProperties;
    description: BaseCSSProperties;
    content: BaseCSSProperties;
    cardHidden: BaseCSSProperties;
    statusRow: BaseCSSProperties;
    status: BaseCSSProperties;
    active: BaseCSSProperties;
    inactive: BaseCSSProperties;
    none: BaseCSSProperties;
}

export interface Props {
    childData?: ChildState;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(childrenZoneStyle as any);