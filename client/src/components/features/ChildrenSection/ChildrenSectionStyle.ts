import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { title } from '../../../styles/globalStyles';
const globalTitle = title as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    sectionTitle: {
        ...globalTitle,
        textAlign: "center",
        fontSize: "1.5em"
    }
}))