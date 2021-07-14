import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { grayColor, primaryColor } from '../../../styles/globalStyles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingRight: "5px",
        paddingTop: "5px"
    },
    icon: {
        color: primaryColor,
        cursor: 'pointer'
    },
    disabled: {
        color: grayColor
    }
}))

export interface Props {
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void);
    checked: boolean;
    helpText: string;
    text: string;
    isExistChild: boolean;
}