import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { NewsState } from '../../../types/global';
import { title } from '../../../styles/globalStyles';
const globalTitle = title as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: "70px 100px"
    },
    sectionTitle: {
        ...globalTitle,
        textAlign: "center",
        fontSize: "1.5em"
    }
}))

export interface Props {
    news: NewsState[] | null;
}