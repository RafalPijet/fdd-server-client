import React, { ReactNode } from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, GridProps } from '@material-ui/core';

interface Props extends GridProps {
  children: ReactNode;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      position: 'relative',
      width: '100%',
      minHeight: '1px',
      paddingRight: '15px',
      paddingLeft: '15px',
      flexBasis: 'auto',
    },
  })
);

const GridItem: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridItem;
