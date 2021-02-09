import React from 'react';
import { PropsClasses, useStyles, StyleProps } from './types';
import image from '../../../images/jumbotronMain.jpg';

import Jumbotron from '../../common/Jumbotron/Jumbotron';

const MainPage: React.FC = (props: any) => {
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <div>
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <h1 className={classes.title}>Preparing...</h1>
        </div>
      </Jumbotron>
    </div>
  );
};

export default MainPage;
