import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const addingImageStyle = (theme: Theme) => ({
    root: {
        height: '450px',
        // backgroundColor: "rgba(255, 255, 255, 0.6)"
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(addingImageStyle as any);