import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { container } from '../../../styles/globalStyles';

const justContainer = container as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            zIndex: 2,
            position: 'relative',
            color: '#FFFFFF',
            paddingTop: "20vh",
            paddingBottom: '200px',
            ...justContainer,
        },
        cardHidden: {
            opacity: "0",
            transform: "translate3d(0, -60px, 0)"
        },
        pageHeader: {
            minHeight: '100vh',
            height: 'auto',
            display: 'inherit',
            position: 'relative',
            margin: '0',
            padding: '0',
            border: '0',
            alignItems: 'center',
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
        form: {
            margin: "0 auto",
            minWidth: '330px',
        },
        inputIconsColor: {
            color: "#495057"
        },
        cardFooter: {
            paddingTop: "0rem",
            justifyContent: "center !important"
        },
    }))