import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import ClassNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import NewsOverview from '../../features/NewsOverview/NewsOverview';
import NewsCreateEdit from '../../features/NewsCreateEdit/NewsCreateEdit';
import ModalAreYouSure from '../../common/ModalAreYouSure/ModalAreYouSure';
import {
  getToast,
  getModalAreYouSure,
  setModalAreYouSure,
  getNews,
} from '../../../redux/actions/generalActions';
import {
  getSuccess,
  getPending,
  getAdding,
  getUpdating,
  getError,
  getAddingError,
  getUpdatingError,
  resetRequest,
  resetAddingRequest,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import { NewsState, ModalAYSModes } from '../../../types/global';
import { getAllNewsRequest } from '../../../redux/thunks';
import { useStyles } from './AdminNewsPageStyle';

const AdminNewsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toast = useSelector(getToast);
  const modalAYS = useSelector(getModalAreYouSure);
  const isPending = useSelector(getPending);
  const isAdding = useSelector(getAdding);
  const isUpdating = useSelector(getUpdating);
  const isSuccess = useSelector(getSuccess);
  const news = useSelector(getNews);
  const error = useSelector(getError);
  const updatingError = useSelector(getUpdatingError);
  const addingError = useSelector(getAddingError);
  const { enqueueSnackbar } = useSnackbar();
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);

  useEffect(() => {
    if (news === null || (news !== null && isSuccess)) {
      dispatch(getAllNewsRequest());
    }
    setCurrentNews(news !== null ? news[0] : news);
  }, [news, isSuccess]);

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
      handleToast(error.message, 'error');
      dispatch(resetRequest());
    }
    if (updatingError.isError) {
      handleToast(updatingError.message, 'error');
      dispatch(resetUpdatingRequest());
    }
    if (addingError.isError) {
      handleToast(addingError.message, 'error');
      dispatch(resetAddingRequest());
    }
  }, [toast.isOpen, error.isError, updatingError.isError, addingError.isError]);

  const selectCurrentNewsHandling = (data: NewsState | null) => {
    setCurrentNews(data);
  };

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const handleModalAYS = (isConfirm: boolean) => {
    if (isConfirm) {
      if (modalAYS.mode === ModalAYSModes.removeNews) {
        console.log('Modal Remove News');
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
        isSpiner={isPending || isUpdating || isAdding}
        fixed
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={
          <HeaderLinks isSpiner={isPending || isUpdating || isAdding} />
        }
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />
      <div className={classes.pageHeader}>
        <div className={classes.container}>
          <Typography variant="h4" className={classes.titlePage}>
            Aktualności
          </Typography>
        </div>
      </div>
      <div className={ClassNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10}>
            <NewsOverview
              news={news}
              getCurrentNews={selectCurrentNewsHandling}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <NewsCreateEdit
              newsQuantity={news === null ? 0 : news.length}
              currentNews={currentNews}
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

export default AdminNewsPage;
