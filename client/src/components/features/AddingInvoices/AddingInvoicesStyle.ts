import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AvailableDestinations } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '490px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    footer: {
        justifyContent: 'center'
    }
}))

export interface Props {
    childId: string | null;
    name: AvailableDestinations;
}