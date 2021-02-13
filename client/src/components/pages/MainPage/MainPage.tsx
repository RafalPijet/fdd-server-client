import React from 'react';
import { PropsClasses, useStyles, StyleProps } from './MainPageStyle';
import classNames from 'classnames';
import image from '../../../images/jumbotronMain.jpg';

import { Typography } from '@material-ui/core';

import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import MessageSection from '../../features/MessageSection/MessageSection';
import Footer from '../../common/Footer/Footer';

const MainPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);

  return (
    <div>
      <Header
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Typography variant="h3" className={classes.title}>
                Preparing...
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <MessageSection />
        <MessageSection />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
