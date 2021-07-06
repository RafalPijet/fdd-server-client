import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import ClassNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import AddingReport from '../../features/AddingReport/AddingReport';
import ReportsList from '../../common/ReportsList/ReportsList';
import {
  getAdding,
  getAddingError,
  resetAddingRequest,
} from '../../../redux/actions/requestActions';
import { getToast, setUserToast } from '../../../redux/actions/generalActions';
import { getReportsYearsRequest } from '../../../redux/thunks';
import { useStyles } from './AdminReportsPageStyle';

const AdminReportsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const addingError = useSelector(getAddingError);
  const toast = useSelector(getToast);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getReportsYearsRequest());
    return () => {
      console.log('You gonna do something');
    };
  }, []);

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (addingError.isError) {
      handleToast(addingError.message, 'error');
      dispatch(resetAddingRequest());
    }
    dispatch(setUserToast({ isOpen: false, content: '', variant: 'success' }));
  }, [toast.isOpen, addingError.isError]);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <div>
      <Header
        isSpiner={isAdding}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isAdding} />}
        changeColorOnScroll={{
          height: 400,
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
            <AddingReport />
          </GridItem>
        </GridContainer>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '80%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={12}>
            <ReportsList />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default AdminReportsPage;
