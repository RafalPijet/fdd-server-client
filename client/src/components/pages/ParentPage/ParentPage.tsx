import React, { useState } from 'react';
import classNames from 'classnames';
import { PropsClasses, useStyles, StyleProps } from './ParentPageStyle';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksParentPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import ParentZone from '../../features/ParentZone/ParentZone';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import MessageSection from '../../features/MessageSection/MessageSection';
import image from '../../../images/jumbotronParent.jpg';

const ParentPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <div>
      <Header
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        rightLinks={<HeaderLinks isSpiner={isDisabled} />}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      ></Header>
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <ParentZone />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <ChildrenZone />
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <MessageSection />
      </div>
      <Footer />
    </div>
  );
};

export default ParentPage;
