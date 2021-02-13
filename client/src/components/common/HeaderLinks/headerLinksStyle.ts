import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';

export interface Props {

}

export interface StyleProps {
    block: BaseCSSProperties;
    left: BaseCSSProperties;
    right: BaseCSSProperties;
}

const styles = (theme: Theme) => ({
    block: {
        color: theme.palette.action,
        padding: '0.9375rem',
        fontWeight: '500',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        textDecoration: 'none',
        position: 'relative',
        display: 'block',
    },
    left: {
        float: 'left!important',
        display: 'block',
    },
    right: {
        padding: '15px 0',
        margin: '0',
        float: 'right!important',
    },
});

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(styles as any);