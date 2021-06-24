import { MouseEvent } from 'react';
import {
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
            color: "#fff"
        },
        icon: {
            color: "#fff"
        }
    })
);

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (
        event: MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

export interface Props {
    quantity: number;
    onChangePage: (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    onChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    rowsPerPage: number;
    page: number;
    isHidden: boolean;
    rowsPerPageOptions: number[],
    label: string,
    isPending?: boolean;
}