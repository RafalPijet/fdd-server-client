import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { primaryColor } from '../../../styles/globalStyles';

const dragDropImageItemStyle = (theme: Theme) => ({
    root: {
        display: "flex",
        padding: "3px",
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    active: {
        backgroundColor: `${primaryColor} !important`
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    active: BaseCSSProperties;
}

export interface Props {
    imageUrl: string;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(dragDropImageItemStyle as any);