import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import UIfx from 'uifx';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import { Typography } from '@material-ui/core';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import ReportsList from '../../common/ReportsList/ReportsList';
import { getReportsYearsRequest } from '../../../redux/thunks';
import {
  getPending,
  getSuccess,
  resetRequest,
} from '../../../redux/actions/requestActions';
import { useStyles } from './ReportsPageStyle';
import reportsEnterSound from '../../../sounds/reportsEnter.wav';

const ReportsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const reportsEnter = new UIfx(reportsEnterSound);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(true);
    };
    dispatch(getReportsYearsRequest());
    return () => {
      dispatch(resetRequest());
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      reportsEnter.play(0.5);
    }
  }, [isLoading, isSuccess]);

  return (
    <div>
      <Header
        isSpiner={isPending}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isPending} />}
        changeColorOnScroll={{
          height: 150,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Sprawozdania
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '70%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={12}>
            <ReportsList isAdmin={true} />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default ReportsPage;
