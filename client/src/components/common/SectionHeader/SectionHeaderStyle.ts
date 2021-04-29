import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { grayColor, primaryColor } from '../../../styles/globalStyles';

const sectionHeaderStyle = (theme: Theme) => ({
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
})

export const FddSwitch = withStyles({
    switchBase: {
        color: grayColor,
        '&$checked': {
            color: primaryColor,
        },
        '&$checked + $track': {
            backgroundColor: primaryColor,
        },
    },
    checked: {},
    track: {},
})(Switch);

export const FddTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: primaryColor,
        color: '#fff',
        boxShadow: theme.shadows[2],
        fontSize: 12,
    },
}))(Tooltip);

export interface StyleProps {
    icon: BaseCSSProperties;
    root: BaseCSSProperties;
    disabled: BaseCSSProperties;
}

export interface Props {
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void);
    checked: boolean;
    helpText: string;
    text: string;
    isExistChild: boolean;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(sectionHeaderStyle as any);