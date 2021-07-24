import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface Props {
    isOpen: boolean;
    isConfirm: (isConfirm: boolean) => void;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    inputIconsColor: {
        color: "#495057"
    },
    textCenter: {
        textAlign: 'center'
    },
    footer: {
        justifyContent: 'space-around'
    }
}))