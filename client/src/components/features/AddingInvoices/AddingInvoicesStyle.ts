import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { AvailableDestinations } from '../../../types/global';

const addingInvoicesStyle = (theme: Theme) => ({
    root: {
        minHeight: '490px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    footer: {
        justifyContent: 'center'
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    active: BaseCSSProperties;
    footer: BaseCSSProperties;
}

export interface Props {
    childId: string | null;
    name: AvailableDestinations;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(addingInvoicesStyle as any);