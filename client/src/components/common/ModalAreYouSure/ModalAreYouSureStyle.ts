import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

export interface Props {
    isOpen: boolean;
    isConfirm: (isConfirm: boolean) => void;
    title: string;
    descriprion: string;
}

const modalAreYouSureStyle = (theme: Theme) => ({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    title: {
        display: 'flex',
        justifyContent: "space-between"
    },
    icon: {
        padding: "16px 24px"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    title: BaseCSSProperties;
    icon: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(modalAreYouSureStyle as any);