import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { VariantType, useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';
import { PropsClasses, useStyles, StyleProps } from './MainPageStyle';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Header from '../../common/Header/Header';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import MessageSection from '../../features/MessageSection/MessageSection';
import Footer from '../../common/Footer/Footer';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksMainPage';
import {
  getPending,
  getError,
  resetRequest,
} from '../../../redux/actions/requestActions';
import { setUserToast, getToast } from '../../../redux/actions/generalActions';
import image from '../../../images/jumbotronMain.jpg';

const MainPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { enqueueSnackbar } = useSnackbar();
  const isPending = useSelector(getPending);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
      handleToast(error.message, 'error');
    }
  }, [toast.isOpen, error.isError]);

  useEffect(() => {
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
                Preparing...
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <MessageSection isDisabled={isPending} />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
