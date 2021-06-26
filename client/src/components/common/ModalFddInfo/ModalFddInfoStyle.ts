import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: "rgba(255, 255, 255, 0.9)"
    },
    title: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
}))

export interface Props {
    isOpen: boolean;
    closeModal: (type: InfoType) => void;
    infoType: InfoType
}

export enum InfoType {
    aboutUs,
    contact
}