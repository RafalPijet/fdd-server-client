import React from 'react';
import Paper from '@material-ui/core/Paper';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Typography from '@material-ui/core/Typography';
import {
  StyleProps,
  Props,
  PropsClasses,
  useStyles,
} from './ShowUserDataStyle';

const ShowUserData: React.FC<Props> = (props) => {
  const { user } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <Paper className={classes.root} elevation={6}>
      {user !== null ? (
        <div className={classes.basicData}>
          <span className={classes.title}>
            imię i nazwisko:
            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
          </span>
          <Typography>{user.phone}</Typography>
          <Typography>{user.email}</Typography>
        </div>
      ) : (
        <Typography>Nie wybrano uzytkownika</Typography>
      )}
    </Paper>
  );
};

export default ShowUserData;
