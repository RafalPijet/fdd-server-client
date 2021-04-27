import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { ArrowsDirection } from '../../../types/global';

const imageEditorStyle = (theme: Theme) => ({
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
})

export interface StyleProps {
    root: BaseCSSProperties;
    crooper: BaseCSSProperties;
}

export interface Props {
    enteredImage: any;
    isGetImage: boolean;
    getPreview: (image: string, isDone: boolean) => void;
    isZoom: boolean | null;
    isRotate: boolean | null;
    isReset: boolean;
    isAvatar: boolean;
    arrow: ArrowsDirection;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(imageEditorStyle as any);