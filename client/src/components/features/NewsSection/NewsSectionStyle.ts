import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { title } from '../../../styles/globalStyles';
const nextTitle = title as BaseCSSProperties;

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: "70px 100px"
    },
    sectionTitle: {
        ...nextTitle,
        textAlign: "center",
        fontSize: "1.5em"
    }
}))



export interface Props {

}