import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import styles from './mainPageStyle';

export interface StyleProps {
    container: BaseCSSProperties;
    title: BaseCSSProperties;
    subtitle: BaseCSSProperties;
    main: BaseCSSProperties;
    mainRaised: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);


