import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import styles from './MessageSectionStyle';

export interface Props {

}

export interface StyleProps {
    section: BaseCSSProperties;
    title: BaseCSSProperties;
    description: BaseCSSProperties;
    textCenter: BaseCSSProperties;
    textArea: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);
