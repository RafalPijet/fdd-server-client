import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import ClassNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import ModalAreYouSure from '../../common/ModalAreYouSure/ModalAreYouSure';
import AddingReport from '../../features/AddingReport/AddingReport';
import ReportsList from '../../common/ReportsList/ReportsList';
import {
  getAdding,
  getPending,
  getAddingError,
  getError,
  resetRequest,
  resetAddingRequest,
} from '../../../redux/actions/requestActions';
import {
  getToast,
  setUserToast,
  getModalAreYouSure,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import { getReportsYearsRequest } from '../../../redux/thunks';
import { ModalAYSModes } from '../../../types/global';
import { useStyles } from './AdminReportsPageStyle';

const AdminReportsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const isPending = useSelector(getPending);
  const pendingError = useSelector(getError);
  const addingError = useSelector(getAddingError);
  const modalAYS = useSelector(getModalAreYouSure);
  const toast = useSelector(getToast);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedReport, setSelectedReport] = useState<any>(null);

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
    if (pendingError.isError) {
      handleToast(pendingError.message, 'error');
      dispatch(resetRequest());
    }
    dispatch(setUserToast({ isOpen: false, content: '', variant: 'success' }));
  }, [toast.isOpen, addingError.isError, pendingError.isError]);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const handleSelectedReport = (_id: string, file: File, title: string) => {
    const data = {
      _id,
      file,
      title,
    };
    setSelectedReport(data);
  };

  const handleModalAYS = (isConfirm: boolean) => {
    if (isConfirm) {
      if (modalAYS.mode === ModalAYSModes.removeReport) {
        if (modalAYS.data.reportId !== undefined) {
          console.log(modalAYS.data.reportId);
          //remove Report
        }
      }
    }

    dispatch(
      setModalAreYouSure({
        mode: ModalAYSModes.null,
        isOpen: false,
        title: '',
        description: '',
        data: {},
      })
    );
  };

  return (
    <div>
      <Header
        isSpiner={isAdding || isPending}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isAdding || isPending} />}
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
            <AddingReport reportToEdit={selectedReport} />
          </GridItem>
        </GridContainer>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '70%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={12}>
            <ReportsList
              isAdmin={false}
              getSelectedReport={handleSelectedReport}
            />
          </GridItem>
        </GridContainer>
      </div>
      <ModalAreYouSure
        isOpen={modalAYS.isOpen}
        title={modalAYS.title}
        descriprion={modalAYS.description}
        isConfirm={handleModalAYS}
      />
    </div>
  );
};

export default AdminReportsPage;
