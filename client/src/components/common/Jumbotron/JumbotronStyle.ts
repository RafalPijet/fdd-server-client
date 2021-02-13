import { ReactNode } from 'react';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const jumbotronStyle = (theme: Theme) => ({
    main: {
        height: "90vh",
        maxHeight: "1000px",
        overflow: "hidden",
        position: "relative",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        margin: "0",
        padding: "0",
        border: "0",
        display: "flex",
        alignItems: "center"
    },
    filter: {
        "&:before": {
            background: "rgba(0, 0, 0, 0.5)"
        },
        "&:after,&:before": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: "''"
        }
    },
    small: {
        height: "380px"
    }
})

export interface Props {
    filter: boolean;
    children: ReactNode;
    style?: Object;
    image: string;
    small?: boolean;
}

export interface StyleProps {
    main: BaseCSSProperties;
    filter: BaseCSSProperties;
    small: BaseCSSProperties;
}
export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(jumbotronStyle as any);