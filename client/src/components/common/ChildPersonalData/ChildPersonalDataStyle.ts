import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { primaryColor } from '../../../styles/globalStyles';
import { ChildState, AvailableDestinations } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
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
}))

export interface Props {
    childId: string | null;
    selectedChild: ChildState | undefined;
    name: AvailableDestinations;
    isOnlyEdit?: boolean;
    userId?: string;
    infoText: string;
    helpText: string;
}