import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { VariantType, useSnackbar } from 'notistack';
import UIfx from 'uifx';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import {
  getUpdating,
  getUpdatingError,
  getUpdatingSuccess,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import { getNews } from '../../../redux/actions/generalActions';
import { NewsState } from '../../../types/global';
import { getAllNewsRequest } from '../../../redux/thunks';
import { useStyles } from './NewsPageStyle';
import image from '../../../images/newsBackground.jpg';
import newsEnterSound from '../../../sounds/loginEnter.wav';

const NewsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const news = useSelector(getNews);
  const { enqueueSnackbar } = useSnackbar();
  const isPending = useSelector(getUpdating);
  const isSuccess = useSelector(getUpdatingSuccess);
  const error = useSelector(getUpdatingError);
  const location = useLocation();
  const newsEnter = new UIfx(newsEnterSound);
  const [currentNews, setCurrentNews] = useState<NewsState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.center]: isPending || currentNews === null,
  });

  useEffect(() => {
    window.onload = () => {
      setIsLoading(true);
    };
    window.scrollTo(0, 0);
    return () => {
      dispatch(resetUpdatingRequest());
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      newsEnter.play(0.5);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    const newsId = location.pathname.replace('/news/', '');
    if (news !== null) {
      const chosenNews = news.find((item: NewsState) => item._id === newsId);
      if (chosenNews !== undefined) {
        setCurrentNews(chosenNews);
      }
    } else {
      dispatch(getAllNewsRequest());
    }
  }, [news]);

  useEffect(() => {
    if (error.isError) {
      handleToast(error.message, 'error');
      dispatch(resetUpdatingRequest());
    }
  }, [error.isError, isSuccess]);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <div>
      <Header
        isSpiner={isPending}
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isPending} />}
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
          <Paper elevation={6} className={rootClasses}>
            {isPending ? (
              <Typography variant="h4">Wczytywanie...</Typography>
            ) : currentNews !== null ? (
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} lg={12}>
                  <Paper variant="outlined" className={classes.title}>
                    <Typography variant="h6" align="center">
                      {currentNews.title}
                    </Typography>
                  </Paper>
                  <Paper variant="outlined" className={classes.content}>
                    <Typography align="justify">
                      {currentNews.content}
                    </Typography>
                  </Paper>
                </GridItem>
                <GridItem xs={12} sm={12} lg={9}>
                  <CustomCarousel
                    images={currentNews.images}
                    isAutoPlay={true}
                  />
                </GridItem>
              </GridContainer>
            ) : (
              <Typography variant="h4">
                Błędny id pobieranego artykułu!
              </Typography>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
