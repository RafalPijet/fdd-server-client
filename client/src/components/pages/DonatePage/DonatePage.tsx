import React from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import { useStyles } from './DonatePageStyle';

const DonatePage: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 150,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Przekaż datek
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center" alignContent="flex-start">
          <GridItem xs={12} sm={12} md={8}>
            <Paper elevation={3} className={classes.root}>
              <Typography variant="h6" align="justify">
                Choroba dziecka to z pewnością trudne doświadczenie dla rodziny.
                Dlatego tak ważna jest rola osób, które potrafią stanąć u ich
                boku. Ważne jest, aby choroba lub niepełnosprawność dziecka
                stała się sprawą nie tylko najbliższej rodziny, ale także innych
                wrażliwych i życzliwych osób. W imieniu podopiecznych Fundacji
                DOROŚLI DZIECIOM apelujemy do wszystkich tych z Państwa, którzy
                rozumieją naszą misję i chcą w niej uczestniczyć, o przekazanie
                1% z podatku dochodowego. To nic nie kosztuje. Natomiast
                świadomość, że zrobiłam lub zrobiłem coś tak ważnego dla
                skrzywdzonego przez los dziecka, daje wyjątkową satysfakcję i
                poczucie spełnienia. Gorąco namawiamy Państwa do przeżyć z tym
                związanych.
              </Typography>
            </Paper>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

export default DonatePage;
