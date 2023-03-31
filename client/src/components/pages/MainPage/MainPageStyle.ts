import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/styles';
import { container, title, primaryColor, lightGrayColor, logoColor } from '../../../styles/globalStyles';

const globaTitle = title as BaseCSSProperties

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        zIndex: 12,
        color: "#FFFFFF",
        ...container
    },
    title: {
        ...globaTitle,
        display: "inline-block",
        position: "relative",
        marginTop: "30px",
        minHeight: "32px",
        color: lightGrayColor,
        lineHeight: '60px',
        textDecoration: "none"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px auto 0"
    },
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: 3
    },
    mainRaised: {
        margin: "-60px 30px 20px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },

    commonEntracte: {
        position: 'absolute',
        width: '100%',
        height: '40px',
        backgroundColor: primaryColor,
        transform: 'rotate(-1deg)',
    },
    firstEntrance: {
        bottom: '1757px',
        zIndex: 0,
    },
    secondEntrance: {
        bottom: '1162px',
        zIndex: -1,
    },
    thirdEntrance: {
        bottom: '577px',
        backgroundColor: logoColor,
        zIndex: 0,
    },
    fourthEntrance: {
        bottom: '-16px',
        backgroundColor: logoColor,
        zIndex: -1,
    },
    image: {
        position: 'relative',
        height: 600,
        // [theme.breakpoints.down('xs')]: {
        //     width: '100% !important', // Overrides inline-style
        //     height: 100,
        // },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                transform: 'scale(1.2)',
                color: primaryColor,
                transition: '10s'
            },
            '& $imageReports': {
                transform: 'scale(1.2)',
                color: logoColor,
                transition: '10s'
            }
        },
    },
    percent: {
        position: 'relative',
        height: 130,
        width: 130,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            transition: '5s',
            '& $imageSrc, & $icon': {
                transform: 'scale(1.5)',
                transition: '3s'
            },
        },
    },
    imagesBox: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusVisible: {},
    imageButton: {
        maxHeight: '60px',
        position: 'absolute',
        left: '43vw',
        right: 0,
        top: '8vh',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    reportsButton: {
        maxHeight: '60px',
        position: 'absolute',
        left: '19vw',
        right: 0,
        top: '29vh',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    icon: {
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transition: '3s',
        transform: 'scale(1)',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        transition: '3s',
        transform: 'scale(1)',
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
        fontFamily: 'Roboto Slab',
        fontSize: '40px',
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageReports: {
        fontFamily: 'Roboto Slab',
        fontSize: '40px',
        position: 'relative',
        maxWidth: 650,
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        position: 'absolute',
        bottom: -40,
        left: 'calc(50% - 20px)',
        transition: theme.transitions.create('opacity'),
    },
}))

export const texts1 = ["Podaruj", "Przekaż", "Ofiaruj"];
export const texts2 = ["nam", "dzieciom", "podopiecznym"];
