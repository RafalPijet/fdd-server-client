import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const previewInvoiceItemStyle = (theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '200px',
        height: '230px',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        maxWidth: '150px',
        maxHeight: "225px"
    },
    document: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: '140px',
        height: 'fit-content'
    },
    disabled: {
        filter: 'grayscale(100%)'
    },
    zoomIcon: {
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    removeIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    dialogFooter: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    image: BaseCSSProperties;
    document: BaseCSSProperties;
    logo: BaseCSSProperties;
    zoomIcon: BaseCSSProperties;
    removeIcon: BaseCSSProperties;
    dialogFooter: BaseCSSProperties;
    disabled: BaseCSSProperties;
}

export interface Props {
    file: File | null;
    number: string;
    getIsRemove?: (key: string) => void;
    isDisabled: boolean;
}

export const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result);
        reader.readAsDataURL(file);
        reader.onerror = (error) => reject(error);
    });
};

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(previewInvoiceItemStyle as any);
