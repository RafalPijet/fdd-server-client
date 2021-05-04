import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { UserState } from '../../../types/global';

const userPersonalDataStyle = (theme: Theme) => ({
    root: {
        minHeight: '490px',
    },
    back: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    inputIconsColor: {
        color: "#495057"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    active: BaseCSSProperties;
    inputIconsColor: BaseCSSProperties;
}

export interface Props {
    isAdmin: boolean;
    user: UserState;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(userPersonalDataStyle as any);