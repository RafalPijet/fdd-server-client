import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import image from '../../../images/sign.jpg';

const childHandlingStyle = (theme: Theme) => ({
    root: {
        height: "1770px",
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
})

export interface StyleProps {
    root: BaseCSSProperties;
    inputIconsColor: BaseCSSProperties;
}

export interface IChildData {
    firstName: string;
    lastName: string;
    birthDate: string;
    info: string;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(childHandlingStyle as any);