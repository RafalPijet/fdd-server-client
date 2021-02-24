import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { ReactNode } from 'react';

const cardStyle = (theme: Theme) => ({
    card: {
        border: "0",
        marginBottom: "30px",
        marginTop: "30px",
        borderRadius: "6px",
        color: "rgba(0, 0, 0, 0.87)",
        background: "#fff",
        width: "100%",
        boxShadow:
            "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        fontSize: ".875rem",
        transition: "all 300ms linear"
    },
    cardPlain: {
        background: "transparent",
        boxShadow: "none"
    },
    cardCarousel: {
        overflow: "hidden"
    }
})

export interface Props {
    className: string;
    plain?: boolean;
    carousel?: boolean;
    children: ReactNode
}

export interface StyleProps {
    card: BaseCSSProperties
    cardPlain: BaseCSSProperties
    cardCarousel: BaseCSSProperties
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(cardStyle as any);