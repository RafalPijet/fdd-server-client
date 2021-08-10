import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { container, logoColor, primaryColor } from '../../../styles/globalStyles';
import image from '../../../images/jumbotronAdmin.jpg';
import imageBack from '../../../images/jumbotronParent.jpg';

const justContainer = container as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        zIndex: 2,
        position: 'relative',
        display: 'inherit',
        justifyContent: 'center',
        ...justContainer,
    },
    root: {
        margin: '50px 0',
        padding: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    pageHeader: {
        minHeight: '20vh',
        height: 'auto',
        display: 'flex',
        position: 'relative',
        margin: '0',
        padding: '0',
        border: '0',
        alignItems: 'center',
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        '&:before': {
            background: 'rgba(0, 0, 0, 0.5)',
        },
        '&:before,&:after': {
            position: 'absolute',
            zIndex: '1',
            width: '100%',
            height: '100%',
            display: 'block',
            left: '0',
            top: '0',
            content: '""',
        },
        '& footer li a,& footer li a:hover,& footer li a:active': {
            color: '#FFFFFF',
        },
        '& footer': {
            position: 'absolute',
            bottom: '0',
            width: '100%',
        },
    },
    titlePage: {
        color: logoColor
    },
    title: {
        color: primaryColor,
        padding: '50px 0',
        fontWeight: 500
    },
    main: {
        backgroundImage: 'url(' + imageBack + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        position: "relative",
        zIndex: 3
    },
    mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    linkBox: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 50,
    }
}))