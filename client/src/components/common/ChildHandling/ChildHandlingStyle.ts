import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const childHandlingStyle = (theme: Theme) => ({
    inputIconsColor: {
        color: "#495057"
    }
})

export interface StyleProps {
    inputIconsColor: BaseCSSProperties
}

export interface IChildData {
    firstName: string;
    lastName: string;
    birthDate: string;
    info: string;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(childHandlingStyle as any);