import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { primaryColor } from '../../../styles/globalStyles';
import { ChildState, AvailableDestinations } from '../../../types/global';

const childPersonalDataStyle = (theme: Theme) => ({
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
    },
    switch: {
        color: primaryColor
    },
    footer: {
        width: '70%',
        margin: '0 auto'
    }
})

export interface Props {
    childId: string | null;
    selectedChild: ChildState | undefined;
    name: AvailableDestinations;
    isOnlyEdit?: boolean;
    infoText: string;
    helpText: string;
}

export interface StyleProps {
    root: BaseCSSProperties;
    back: BaseCSSProperties;
    active: BaseCSSProperties;
    inputIconsColor: BaseCSSProperties;
    switch: BaseCSSProperties;
    footer: BaseCSSProperties;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(childPersonalDataStyle as any);