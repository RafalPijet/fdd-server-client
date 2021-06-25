import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.9)"
    }
}))

export interface Props {
    isOpen: boolean;
    closeModal: () => void;
}