import React from 'react';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { useStyles } from './StatutPageStyle';
import image from '../../../images/newsBackground.jpg';

const StatutPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Header
        isSpiner={false}
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={false} />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <Paper elevation={3} className={classes.root}>
            Statut
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default StatutPage;
