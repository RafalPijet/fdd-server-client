import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface Props {
    isOpen: boolean;
    isConfirm: (isConfirm: boolean) => void;
    title: string;
    descriprion: string;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))