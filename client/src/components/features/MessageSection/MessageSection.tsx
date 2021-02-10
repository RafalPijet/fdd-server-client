import React from 'react';
import { PropsClasses, useStyles, StyleProps, Props } from './types';
import { Typography } from '@material-ui/core';

import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';

const MessageSection: React.FC<Props> = (props) => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Typography variant="h2" className={classes.title}>
            Napisz do nas
          </Typography>
          <Typography variant="h4" className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </Typography>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <input type="text" />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <input type="text" />
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default MessageSection;
