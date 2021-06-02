import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { defaultFont, tooltipsStyle, grayColor, primaryColor } from '../../../styles/globalStyles';

export interface Props {
    isSpiner?: boolean
}

export interface StyleProps {
    list: BaseCSSProperties;
    listItem: BaseCSSProperties;
    listItemText: BaseCSSProperties;
    navLink: BaseCSSProperties;
    notificationNavLink: BaseCSSProperties;
    registerNavLink: BaseCSSProperties;
    navLinkActive: BaseCSSProperties;
    icons: BaseCSSProperties;
    avatar: BaseCSSProperties;
    socialIcons: BaseCSSProperties;
    dropdownLink: BaseCSSProperties;
    marginRight5: BaseCSSProperties;
    tooltipsStyle: BaseCSSProperties;
    disabled: BaseCSSProperties;
    linkScroll: BaseCSSProperties;
}

const styles = (theme: Theme) => ({
    list: {
        ...defaultFont,
        fontSize: '14px',
        margin: 0,
        paddingLeft: '0',
        listStyle: 'none',
        paddingTop: '0',
        paddingBottom: '0',
        color: 'inherit',
    },
    listItem: {
        float: 'left',
        color: 'inherit',
        position: 'relative',
        display: 'block',
        width: 'auto',
        margin: '0',
        padding: '0',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            '&:after': {
                width: 'calc(100% - 30px)',
                content: '""',
                display: 'block',
                height: '1px',
                marginLeft: '15px',
                backgroundColor: '#e5e5e5',
            },
        },
    },
    listItemText: {
        padding: '0 !important',
    },
    navLink: {
        color: 'inherit',
        position: 'relative',
        padding: '0.9375rem',
        fontWeight: '400',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
        '&:hover,&:focus': {
            color: 'inherit',
            background: 'rgba(200, 200, 200, 0.2)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 30px)',
            marginLeft: '15px',
            marginBottom: '8px',
            marginTop: '8px',
            textAlign: 'left',
            '& > span:first-child': {
                justifyContent: 'flex-start',
            },
        },
    },
    notificationNavLink: {
        color: 'inherit',
        padding: '0.9375rem',
        fontWeight: '400',
        fontSize: '12px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
        top: '4px',
    },
    registerNavLink: {
        top: '3px',
        position: 'relative',
        fontWeight: '400',
        fontSize: '12px',
        textTransform: 'uppercase',
        lineHeight: '20px',
        textDecoration: 'none',
        margin: '0px',
        display: 'inline-flex',
    },
    navLinkActive: {
        color: 'inherit',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    icons: {
        width: '20px',
        height: '20px',
        marginRight: '5px',
    },
    avatar: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
    },
    socialIcons: {
        position: 'relative',
        fontSize: '20px !important',
        marginRight: '4px',
    },
    dropdownLink: {
        '&,&:hover,&:focus': {
            color: 'inherit',
            textDecoration: 'none',
            display: 'block',
            padding: '10px 20px',
        },
    },
    ...tooltipsStyle,
    marginRight5: {
        marginRight: '5px',
    },
    disabled: {
        color: grayColor
    },
    linkScroll: {
        display: 'flex',
        alignItems: 'center',
        padding: "5px"
    }
});

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(styles as any);