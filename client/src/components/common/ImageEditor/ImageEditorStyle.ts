import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ArrowsDirection } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: "0 10px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '450px',
        width: '100%',
        backgroundColor: "rgba(255, 255, 255, 0.4)",
    },
    crooper: {
        height: "400px",
        width: "100%"
    },
}))

export interface Props {
    enteredImage: any;
    isGetImage: boolean;
    getPreview: (image: string, isDone: boolean) => void;
    isZoom: boolean | null;
    isRotate: boolean | null;
    isReset: boolean;
    isAvatar: boolean;
    arrow: ArrowsDirection;
    isDisabled: boolean;
}