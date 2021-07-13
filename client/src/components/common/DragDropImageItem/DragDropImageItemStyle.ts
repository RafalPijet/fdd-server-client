import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        padding: "3px",
        backgroundColor: "rgba(255, 255, 255, 0.2)"
    },
    active: {
        backgroundColor: `${primaryColor} !important`
    },
    image: {
        width: '100px',
        height: '66px'
    },
    disabled: {
        filter: 'grayscale(100%)'
    }
}))

export interface Props {
    imageUrl: string;
    isDisabled: boolean
}