import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import styles from './footerStyle';

export interface Props {
    whiteFont?: boolean
}

export interface StyleProps {
    block: BaseCSSProperties;
    left: BaseCSSProperties;
    right: BaseCSSProperties;
    footer: BaseCSSProperties;
    a: BaseCSSProperties
    footerWhiteFont: BaseCSSProperties
    container: BaseCSSProperties
    list: BaseCSSProperties
    inlineBlock: BaseCSSProperties
    icon: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);