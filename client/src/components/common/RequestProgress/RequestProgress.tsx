import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import {
  logoColor,
  successColor,
  greenDarkColor,
} from '../../../styles/globalStyles';

const RequestProgress = withStyles({
  root: {
    backgroundColor: logoColor,
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: successColor,
    },
    '& .MuiLinearProgress-bar2Indeterminate': {
      backgroundColor: greenDarkColor,
    },
  },
})(LinearProgress);

export default RequestProgress;
