import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
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