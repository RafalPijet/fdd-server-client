import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { InvoiceState } from '../../../types/global';
import { lightGrayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        margin: '30px 15px',
        maxHeight: '60px'
    },
    icon: {
        color: '#fff',
        position: 'absolute',
        left: '-33px',
        top: '-49px',
        fontSize: '120px',
        zIndex: 0,
    },
    main: {
        width: '20px',
        height: '20px',
        padding: '10px',
        border: '9px solid rgba(156, 39, 176, 0.8)',
        borderRadius: '10%',
        backgroundColor: '#fff',
        position: 'relative',
    },
    dayBox: {
        width: 'fit-content',
        position: 'absolute',
        top: '-9px',
        left: '-14px',
    },
    dayValue: {
        background: 'rgba(156, 39, 176, 0.8)',
        fontSize: '1.4rem',
        color: '#fff',
        padding: '5px',
    },
    monthBox: {
        width: 'fit-content',
        position: 'absolute',
        top: '0px',
        right: '-2px',
        backgroundColor: 'inherit',
    },
    monthValue: {
        color: 'rgba(156, 39, 176, 0.8)',
        fontSize: '0.8rem',
        padding: '10px 3px 3px 3px',
        fontWeight: 700,
    },
    yearBox: {
        width: 'fit-content',
        position: 'absolute',
        bottom: '-9px',
        right: '-9px',
        backgroundColor: 'rgba(156, 39, 176, 0.8)',
        padding: '0 5px',
    },
    yearValue: {
        color: 'rgba(166, 206, 57, 0.8)',
        fontSize: '0.8rem'
    },
    logo: {
        position: 'absolute',
        bottom: '-14px',
        left: '-17px',
        zIndex: 20,
    },
    chosen: {
        color: lightGrayColor
    }
}))

export interface Props {
    invoice: InvoiceState;
    choisenId: string;
    getChosenInvoice: (invoice: InvoiceState) => void;
    isDisabled: boolean;
}
