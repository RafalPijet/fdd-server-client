import { ReactNode } from 'react';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import styles from './jumbotronStyle';

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
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);
