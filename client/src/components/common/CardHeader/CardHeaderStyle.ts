import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import {
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader
} from '../../../styles/globalStyles';
import { ReactNode } from 'react';

const cardHeaderStyle = (theme: Theme) => ({
    cardHeader: {
        borderRadius: "3px",
        padding: "1rem 15px",
        marginLeft: "15px",
        marginRight: "15px",
        marginTop: "-30px",
        border: "0",
        marginBottom: "0"
    },
    cardHeaderPlain: {
        marginLeft: "0px",
        marginRight: "0px"
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader
})

export interface Props {
    className: string;
    color: Exclude<keyof StyleProps, "cardHeader" | "cardHeaderPlain">
    plain?: boolean;
    children: ReactNode
}

export interface StyleProps {
    cardHeader: BaseCSSProperties;
    cardHeaderPlain: BaseCSSProperties;
    warningCardHeader: BaseCSSProperties;
    successCardHeader: BaseCSSProperties;
    dangerCardHeader: BaseCSSProperties;
    infoCardHeader: BaseCSSProperties;
    primaryCardHeader: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(cardHeaderStyle as any);