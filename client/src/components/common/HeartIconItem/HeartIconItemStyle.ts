import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor, logoColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        padding: 5,
        margin: 20,
        background: "rgba(255, 255, 255, 0.7)",
        width: 'fit-content'
    },
    butterfly: {
        position: 'absolute',
        top: -15,
        left: -15,
        zIndex: 2
    },
    image: {
        position: 'relative',
        height: 130,
        width: 130,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.25,
            },
            '& $imageButton': {
                color: primaryColor
            }
        },
    },
    selectedImageButton: {
        color: `${primaryColor} !important`
    },
    selectedImageBackdrop: {
        opacity: `${0.25} !important`
    },
    imageSrc: {
        width: 120,
        height: 120,
        position: 'absolute',
        left: 5,
        right: 0,
        top: 5,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 0%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: logoColor,
        opacity: 0,
        transition: theme.transitions.create('opacity'),
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: logoColor,
    },
    imageTitle: {
        paddingBottom: 5,
        fontFamily: 'Roboto Slab',
        fontSize: '25px',
        position: 'relative',
        fontWeight: 600
    },
    anotherTitle: {
        width: '50%',
        lineHeight: '15px',
        paddingBottom: 5,
        fontFamily: 'Roboto Slab',
        fontSize: '20px',
    }
}))

export interface Props {
    value: number;
    selectedValue: number;
    isOther?: boolean,
    getSelectedValue: (value: number) => void
}