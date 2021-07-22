import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { VariantType, useSnackbar } from 'notistack';
import UIfx from 'uifx';
import { Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Redirect } from 'react-router';
import { useStyles } from './MainPageStyle';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import MessageSection from '../../features/MessageSection/MessageSection';
import NewsSection from '../../features/NewsSection/NewsSection';
import Footer from '../../common/Footer/Footer';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksMainPage';
import {
  getPending,
  getError,
  resetRequest,
} from '../../../redux/actions/requestActions';
import {
  setUserToast,
  getToast,
  getNews,
} from '../../../redux/actions/generalActions';
import {
  getAllNewsRequest,
  getChildrenBasicDataRequest,
} from '../../../redux/thunks';
import { AvailableDestinations } from '../../../types/global';
import image from '../../../images/jumbotronMain.jpg';
import childrenButton from '../../../images/childrenButton.jpg';
import reportsButton from '../../../images/reportsButton.jpg';
import notificationSound from '../../../sounds/notification.wav';
import warningSound from '../../../sounds/warning.wav';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isPending = useSelector(getPending);
  const news = useSelector(getNews);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const notification = new UIfx(notificationSound);
  const warning = new UIfx(warningSound);
  const [isRedirectToChildren, setIsRedirectToChildren] =
    useState<boolean>(false);
  const [isRedirectToReports, setIsRedirectToReports] =
    useState<boolean>(false);

  useEffect(() => {
    if (toast.isOpen) {
      notification.play(0.5);
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
      warning.play(0.5);
      handleToast(error.message, 'error');
    }
  }, [toast.isOpen, error.isError]);

  useEffect(() => {
    dispatch(getAllNewsRequest());
    dispatch(getChildrenBasicDataRequest(0, 12));
    window.scrollTo(0, 0);
    return () => {
      if (toast.isOpen) {
        dispatch(
          setUserToast({
            isOpen: false,
            content: '',
            variant: 'success',
          })
        );
      }
      if (error.isError) {
        dispatch(resetRequest());
      }
    };
  }, []);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  if (isRedirectToChildren) {
    return <Redirect to="/children" />;
  }

  if (isRedirectToReports) {
    return <Redirect to="/reports" />;
  }

  return (
    <div id={AvailableDestinations.mainPage}>
      <Header
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        isSpiner={isPending}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
        rightLinks={<HeaderLinks isSpiner={isPending} />}
      />
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Typography variant="h4" className={classes.title}>
                Człowiek jest wielki nie przez to, co posiada, lecz przez to kim
                jest; nie przez to co ma, lecz przez to, czym dzieli się z
                innymi.
              </Typography>
              <Typography
                variant="h6"
                align="right"
                className={classes.title}
                style={{ width: '100%' }}
              >
                św. Jan Paweł II
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div
        id={AvailableDestinations.news}
        className={classNames(classes.main, classes.mainRaised)}
      >
        <NewsSection news={news} />
        <div
          className={classNames(classes.commonEntracte, classes.firstEntrance)}
        ></div>
        <ButtonBase
          focusRipple
          onClick={() => setTimeout(() => setIsRedirectToChildren(true), 300)}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
          id={AvailableDestinations.children}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${childrenButton})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <div className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              Podopieczni - poznaj ich historie...
            </Typography>
          </div>
        </ButtonBase>
        <div
          id={AvailableDestinations.outsideMessage}
          className={classNames(classes.commonEntracte, classes.secondEntrance)}
        ></div>
        <MessageSection isDisabled={isPending} />
        <div
          className={classNames(classes.commonEntracte, classes.thirdEntrance)}
        ></div>
        <ButtonBase
          focusRipple
          onClick={() => setTimeout(() => setIsRedirectToReports(true), 300)}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: '100%',
          }}
          id={AvailableDestinations.reports}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${reportsButton})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <div className={classes.reportsButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageReports}
            >
              Sprawozdania Organizacji Pożytku Publicznego
            </Typography>
          </div>
        </ButtonBase>
        <div
          className={classNames(classes.commonEntracte, classes.fourthEntrance)}
        ></div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
