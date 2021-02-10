import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridProps } from '@material-ui/core';

interface Props extends GridProps {
  children: ReactNode;
}

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto',
  },
};

const useStyles = makeStyles(styles);

const GridContainer: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridContainer;
