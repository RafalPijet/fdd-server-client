import React from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import { useStyles } from './PercentPageStyle';

const PercentPage: React.FC = () => {
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
            Przekaż 1,5% podatku
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
                1,5% z podatku dochodowego. To nic nie kosztuje. Natomiast
                świadomość, że zrobiłam lub zrobiłem coś tak ważnego dla
                skrzywdzonego przez los dziecka, daje wyjątkową satysfakcję i
                poczucie spełnienia. Gorąco namawiamy Państwa do przeżyć z tym
                związanych.
              </Typography>
              <Typography variant="h5" align="center" className={classes.title}>
                Jak przekazać 1,5% podatku na rzecz Fundacji DOROŚLI DZIECIOM.
              </Typography>
              <Typography variant="h6" align="center">
                W rocznym zeznaniu podatkowym (PIT-36, PIT-37 lub PIT-28) należy
                wypełnić odpowiednią rubrykę. W miejscu tym wpisujemy nazwę
                organizacji pożytku publicznego tj.
              </Typography>
              <Typography variant="h5" align="center" className={classes.title}>
                FUNDACJA DOROŚLI DZIECIOM
              </Typography>
              <Typography variant="h6" align="center">
                oraz numer jej wpisu do Krajowego Rejestru Sądowego tj.
              </Typography>
              <Typography variant="h5" align="center" className={classes.title}>
                0000243743
              </Typography>
              <Typography variant="h6" align="center">
                Można także wskazać podopiecznego, dla którego deklarowana jest
                wpłata.
              </Typography>
              <Typography variant="h6" align="center">
                Środki finansowe - 1,5% podatku należnego - na konto naszej
                Fundacji przekaże urząd skarbowy w terminie do 3 miesięcy.
              </Typography>
              <Typography variant="h6" align="center" className={classes.title}>
                Możesz również użyć serwisu do rozliczenia PIT online:
              </Typography>
              <div className={classes.linkBox}>
                <a
                  href="https://www.pitax.pl/rozlicz?krs=0000243743"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    alt="Rozliczenie PIT z PITax.pl"
                    src="https://www.pitax.pl/assets/Uploads/rozlicz-pit-online-new-button.png"
                  />
                </a>
              </div>
            </Paper>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>
  );
};

export default PercentPage;
