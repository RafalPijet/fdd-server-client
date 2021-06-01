import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { grayColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            margin: '20px 0',
            padding: '10px',
            width: '100%',
            backgroundColor: "rgba(166, 206, 57, 0.1)",
        },
        image: {
            position: 'relative',
            height: 300,
            [theme.breakpoints.down('xs')]: {
                width: '100% !important', // Overrides inline-style
                height: 100,
            },
            '&:hover, &$focusVisible': {
                zIndex: 1,
                '& $imageBackdrop': {
                    opacity: 0.15,
                },
                '& $imageMarked': {
                    opacity: 0,
                },
                '& $imageTitle': {
                    fontSize: '20px',
                    transition: '.3s'
                },
            },
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
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.4,
            transition: theme.transitions.create('opacity'),
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        },
        imageMarked: {
            position: 'absolute',
            bottom: -40,
            left: 'calc(50% - 20px)',
            transition: theme.transitions.create('opacity'),
        },
        content: {
            color: grayColor,
            fontFamily: 'Roboto Slab',
            fontStyle: 'italic'

        },
        contentRight: {
            paddingRight: '20px'
        },
        contentLeft: {
            paddingLeft: '20px'
        }
    }),
);

export interface Props {
    url: string;
    title: string;
    content: string;
    index: number;
}