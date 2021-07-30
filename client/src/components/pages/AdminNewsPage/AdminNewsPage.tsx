import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import ClassNames from 'classnames';
import { Redirect } from 'react-router';
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
  setAllNews,
  getIsRemoved,
  setIsRemoved,
  getIsFrozen,
} from '../../../redux/actions/generalActions';
import {
  getSuccess,
  getUpdatingSuccess,
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
import { getUserId } from '../../../redux/actions/userActions';
import { NewsState, ModalAYSModes } from '../../../types/global';
import {
  getAllNewsRequest,
  removeCurrentNewsRequest,
} from '../../../redux/thunks';
import { useStyles } from './AdminNewsPageStyle';

const AdminNewsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toast = useSelector(getToast);
  const modalAYS = useSelector(getModalAreYouSure);
  const isPending = useSelector(getPending);
  const isAdding = useSelector(getAdding);
  const isUpdating = useSelector(getUpdating);
  const isRemoved = useSelector(getIsRemoved);
  const isSuccess = useSelector(getSuccess);
  const isUpdatingSuccess = useSelector(getUpdatingSuccess);
  const userId = useSelector(getUserId);
  const isFrozen = useSelector(getIsFrozen);
  const news = useSelector(getNews);
  const error = useSelector(getError);
  const updatingError = useSelector(getUpdatingError);
  const addingError = useSelector(getAddingError);
  const { enqueueSnackbar } = useSnackbar();
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);
  const [newsQuantity, setNewsQuantity] = useState<number | null>(null);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(setAllNews(null));
    };
  }, []);

  useEffect(() => {
    setIsRedirect(!userId || isFrozen);
  }, [userId, isFrozen]);

  useEffect(() => {
    if (news === null || (news !== null && isSuccess)) {
      dispatch(getAllNewsRequest());
    }
    if (currentNews === null) {
      setCurrentNews(news !== null ? news[0] : news);
      setNewsQuantity(news !== null ? news.length : news);
    }
  }, [news, isSuccess]);

  useEffect(() => {
    if (isRemoved && news !== null && isUpdatingSuccess) {
      setCurrentNews(news[0]);
      setNewsQuantity(news.length);
      dispatch(setIsRemoved(false));
    }

    if (
      news !== null &&
      newsQuantity !== news.length &&
      !isUpdatingSuccess &&
      !isRemoved &&
      newsQuantity !== null
    ) {
      setNewsQuantity(news.length);
      setCurrentNews(news[news.length - 1]);
    }
  }, [isRemoved, isUpdatingSuccess, news, newsQuantity]);

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
    if (currentNews !== data) {
      setCurrentNews(data);
    }
  };

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const handleModalAYS = (isConfirm: boolean) => {
    if (isConfirm) {
      if (modalAYS.mode === ModalAYSModes.removeNews) {
        if (
          modalAYS.data.newsStatus !== undefined &&
          modalAYS.data.newsStatus._id !== undefined
        ) {
          dispatch(
            removeCurrentNewsRequest(
              modalAYS.data.newsStatus._id,
              modalAYS.data.newsStatus.images
            )
          );
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

  if (isRedirect) {
    return <Redirect to={'/admin'} />;
  }

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
              chosenNews={currentNews}
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
