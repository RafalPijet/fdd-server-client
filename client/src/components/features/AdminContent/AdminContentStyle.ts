import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import image from '../../../images/sign.jpg';

const adminContentStyle = (theme: Theme) => ({
    root: {
        height: "2470px",
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
    },
    childZone: {
        margin: '20px 0',
        background: 'rgba(156, 39, 176, 0.8)',
        padding: '30px 80px'
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    inputIconsColor: BaseCSSProperties;
    childZone: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(adminContentStyle as any);