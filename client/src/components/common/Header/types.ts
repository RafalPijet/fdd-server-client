import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import styles from './headreStyle';
import { ReactNode } from 'react';

type availableColors =
    "primary" |
    "info" |
    "success" |
    "warning" |
    "danger" |
    "transparent" |
    "white" |
    "rose" |
    "dark"

export interface Props {
    color: availableColors;
    rightLinks?: ReactNode;
    leftLinks?: ReactNode;
    brand: string;
    fixed: boolean;
    absolute?: boolean;
    changeColorOnScroll: {
        height: number;
        color: availableColors
    }
}

export interface StyleProps {
    appBar: BaseCSSProperties;
    absolute: BaseCSSProperties;
    fixed: BaseCSSProperties;
    container: BaseCSSProperties;
    flex: BaseCSSProperties;
    title: BaseCSSProperties;
    appResponsive: BaseCSSProperties;
    primary: BaseCSSProperties;
    info: BaseCSSProperties;
    success: BaseCSSProperties;
    warning: BaseCSSProperties;
    danger: BaseCSSProperties;
    rose: BaseCSSProperties;
    transparent: BaseCSSProperties;
    dark: BaseCSSProperties;
    white: BaseCSSProperties;
    drawerPaper: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);