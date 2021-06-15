import React, { useState, useEffect } from 'react';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import { useStyles } from './ChildrenSectionStyle';

const ChildrenSection: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <Typography variant="h4" className={classes.sectionTitle}>
            Podopieczni
          </Typography>
          <div style={{ height: '500px' }}></div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default ChildrenSection;
