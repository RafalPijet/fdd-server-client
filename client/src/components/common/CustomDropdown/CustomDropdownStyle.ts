import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { AvailableHoverColors } from '../../../types/global';
import { ButtonProps } from '@material-ui/core';
import {
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    infoBoxShadow,
    successColor,
    successBoxShadow,
    warningColor,
    warningBoxShadow,
    dangerColor,
    dangerBoxShadow,
    roseColor,
    roseBoxShadow
} from '../../../styles/globalStyles';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

const customDropdownStyle = (theme: Theme) => ({
    popperClose: {
        pointerEvents: "none"
    },
    dropdown: {
        borderRadius: "3px",
        border: "0",
        boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
        top: "100%",
        zIndex: "1000",
        minWidth: "160px",
        padding: "5px 0",
        margin: "2px 0 0",
        fontSize: "14px",
        textAlign: "left",
        listStyle: "none",
        backgroundColor: "#fff",
        backgroundClip: "padding-box"
    },
    menuList: {
        padding: "0"
    },
    popperResponsive: {
        zIndex: "1200",
        [theme.breakpoints.down("sm")]: {
            zIndex: "1640",
            position: "static",
            float: "none",
            width: "auto",
            marginTop: "0",
            backgroundColor: "transparent",
            border: "0",
            boxShadow: "none",
            color: "black"
        }
    },
    dropdownItem: {
        ...defaultFont,
        fontSize: "13px",
        padding: "10px 20px",
        margin: "0 5px",
        borderRadius: "2px",
        position: "relative",
        transition: "all 150ms linear",
        display: "block",
        clear: "both",
        fontWeight: "400",
        height: "fit-content",
        color: "#333",
        whiteSpace: "nowrap",
        minHeight: "unset"
    },
    blackHover: {
        "&:hover": {
            boxShadow:
                "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(33, 33, 33, 0.4)",
            backgroundColor: "#212121",
            color: "#fff"
        }
    },
    primaryHover: {
        "&:hover": {
            backgroundColor: primaryColor,
            color: "#FFFFFF",
            ...primaryBoxShadow
        }
    },
    infoHover: {
        "&:hover": {
            backgroundColor: infoColor,
            color: "#FFFFFF",
            ...infoBoxShadow
        }
    },
    successHover: {
        "&:hover": {
            backgroundColor: successColor,
            color: "#FFFFFF",
            ...successBoxShadow
        }
    },
    warningHover: {
        "&:hover": {
            backgroundColor: warningColor,
            color: "#FFFFFF",
            ...warningBoxShadow
        }
    },
    dangerHover: {
        "&:hover": {
            backgroundColor: dangerColor,
            color: "#FFFFFF",
            ...dangerBoxShadow
        }
    },
    roseHover: {
        "&:hover": {
            backgroundColor: roseColor,
            color: "#FFFFFF",
            ...roseBoxShadow
        }
    },
    dropdownItemRTL: {
        textAlign: "right"
    },
    buttonIcon: {
        width: "20px",
        height: "20px"
    },
    caret: {
        transition: "all 150ms ease-in",
        display: "inline-block",
        width: "0",
        height: "0",
        marginLeft: "4px",
        verticalAlign: "middle",
        borderTop: "4px solid",
        borderRight: "4px solid transparent",
        borderLeft: "4px solid transparent"
    },
    caretActive: {
        transform: "rotate(180deg)"
    },
    caretRTL: {
        marginRight: "4px"
    },
    noLiPadding: {
        padding: "0"
    }
});

export interface Props {
    hoverColor: AvailableHoverColors,
    buttonText: React.ReactNode,
    buttonIcon: OverridableComponent<SvgIconTypeMap>,
    dropdownList: React.ReactNode[],
    buttonProps: ButtonProps,
    rtlActive?: boolean,
    caret?: boolean,
    noLiPadding: boolean,
    onClick?: React.MouseEventHandler,
    isDisabled?: boolean
}

export interface StyleProps {
    popperClose: BaseCSSProperties;
    dropdown: BaseCSSProperties;
    menuList: BaseCSSProperties;
    popperResponsive: BaseCSSProperties;
    dropdownItem: BaseCSSProperties;
    blackHover: BaseCSSProperties;
    primaryHover: BaseCSSProperties;
    infoHover: BaseCSSProperties;
    successHover: BaseCSSProperties;
    warningHover: BaseCSSProperties;
    dangerHover: BaseCSSProperties;
    roseHover: BaseCSSProperties;
    dropdownItemRTL: BaseCSSProperties;
    buttonIcon: BaseCSSProperties;
    caret: BaseCSSProperties;
    caretActive: BaseCSSProperties;
    caretRTL: BaseCSSProperties;
    noLiPadding: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(customDropdownStyle as any);