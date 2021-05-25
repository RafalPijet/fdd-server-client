import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { InvoiceState } from '../../../types/global';

const childInvoicesStyle = (theme: Theme) => ({
    root: {
        minHeight: '390px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
})

export interface Props {
    invoices: InvoiceState[];
}

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    active: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(childInvoicesStyle as any);