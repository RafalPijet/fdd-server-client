import React, { useState } from 'react';
import classNames from 'classnames';
import { Redirect, useHistory } from 'react-router-dom';
import CustomButton from '../../common/CustomButton/CustomButton';
import { PropsClasses, useStyles, StyleProps } from './ParentPageStyle';
import Header from '../../common/Header/Header';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import Footer from '../../common/Footer/Footer';
import MessageSection from '../../features/MessageSection/MessageSection';
import image from '../../../images/jumbotronParent.jpg';

const ParentPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isRedirect, setIsRedirect] = useState(false);
  let history = useHistory();
  const handleRedirect = () => {
    setIsRedirect(true);
  };

  if (isRedirect) {
    console.log('Go');
    return <Redirect to="/" />;
    // history.push('/login');
  }
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
      ></Header>
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Typography variant="h3">Preparing parent zone...</Typography>
              <CustomButton
                setSize="md"
                setColor="info"
                onClick={handleRedirect}
              >
                Redirect
              </CustomButton>
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

export default ParentPage;
