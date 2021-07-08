import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InvoiceState } from '../../../types/global';
import { lightGrayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '390px',
        maxWidth: '1000px'
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.7)"
    },
    icons: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '15px 10px 0',
        height: '215px',
        overflow: 'auto',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        height: '50px',
        overflow: 'auto',
        padding: '0 5px',
        marginTop: '20px'
    },
    textColor: {
        color: lightGrayColor,
        fontWeight: 500
    },
    footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: 0
    }
}))

export interface Props {
    invoices: InvoiceState[];
}