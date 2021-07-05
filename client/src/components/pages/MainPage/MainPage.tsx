import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { VariantType, useSnackbar } from 'notistack';
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
import image from '../../../images/jumbotronMain.jpg';
import childrenButton from '../../../images/childrenButton.jpg';
import reportsButton from '../../../images/test.jpg';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isPending = useSelector(getPending);
  const news = useSelector(getNews);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const [isRedirectToChildren, setIsRedirectToChildren] =
    useState<boolean>(false);
  const [isRedirectToReports, setIsRedirectToReports] =
    useState<boolean>(false);

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
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
    <div>
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
              <Typography variant="h3" className={classes.title}>
                Zapewnienie każdej osobie możliwości pomocy dzieciom w leczeniu,
                nauce i rozwoju
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
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
