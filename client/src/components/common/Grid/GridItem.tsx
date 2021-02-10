import React, { ReactNode } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid, GridProps } from '@material-ui/core';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const styles = {
  grid: {
    position: 'relative',
    width: '100%',
    minHeight: '1px',
    paddingRight: '15px',
    paddingLeft: '15px',
    flexBasis: 'auto',
  },
};

interface Props extends GridProps {
  children: ReactNode;
}

interface StyleProps {
  grid: BaseCSSProperties;
}

type PropsClasses = Record<keyof StyleProps, string>;

const useStyles = makeStyles<Theme, StyleProps>(() => styles as any);

const GridItem: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};

export default GridItem;
