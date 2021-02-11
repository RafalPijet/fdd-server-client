import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { InputLabelProps, InputProps, FormControlProps } from '@material-ui/core';
import styles from './customInputStyle';

export interface Props {
    labelText: string;
    labelProps?: InputLabelProps;
    id: string;
    inputProps?: InputProps;
    formControlProps?: FormControlProps;
    inputRootCustomClasses?: any;
    error?: boolean;
    success?: boolean;
    white?: boolean;
}

export interface StyleProps {
    disabled: BaseCSSProperties;
    underline: BaseCSSProperties;
    underlineError: BaseCSSProperties;
    underlineSuccess: BaseCSSProperties;
    whiteUnderline: BaseCSSProperties
    labelRoot: BaseCSSProperties
    labelRootError: BaseCSSProperties
    labelRootSuccess: BaseCSSProperties
    formControl: BaseCSSProperties
    input: BaseCSSProperties
    whiteInput: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);
