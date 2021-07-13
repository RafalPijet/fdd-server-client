import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { SearchUserType } from '../../../types/global';
import { useStyles, Props } from './AdminContentHeaderStyle';

const AdminContentHeader: React.FC<Props> = (props) => {
  const { userType } = props;
  const classes = useStyles();
  const showContent = () => {
    if (userType === SearchUserType.child) {
      return 'Wyszukaj podopiecznego';
    } else if (userType === SearchUserType.parent) {
      return 'Wyszukaj rodzica';
    } else {
      return 'Wyszukaj admina';
    }
  };
  return (
    <Paper className={classes.root} elevation={6}>
      <Paper elevation={8} className={classes.header}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} lg={12}>
            <Typography variant="h4" className={classes.text}>
              {showContent()}
            </Typography>
          </GridItem>
        </GridContainer>
      </Paper>
    </Paper>
  );
};

export default AdminContentHeader;
