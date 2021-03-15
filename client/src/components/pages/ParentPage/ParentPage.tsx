import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import { PropsClasses, useStyles, StyleProps } from './ParentPageStyle';
import { getPending, getError } from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksParentPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import ParentZone from '../../features/ParentZone/ParentZone';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import MessageSection from '../../features/MessageSection/MessageSection';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { resetRequest } from '../../../redux/actions/requestActions';
import {
  loadUserMessages,
  setUserToast,
  getToast,
} from '../../../redux/actions/messageActions';
import image from '../../../images/jumbotronParent.jpg';

const ParentPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const isPending = useSelector(getPending);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
      localStorage.removeItem('tokenFDD');
      localStorage.removeItem('expiresInFDD');
      dispatch(cleanCurrentUser());
      dispatch(resetRequest());
      dispatch(loadUserMessages([], 0));
      dispatch(
        setUserToast({
          isOpen: false,
          content: '',
          variant: 'success',
        })
      );
    };
  }, []);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  return (
    <div>
      <Header
        isSpiner={isPending}
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        rightLinks={<HeaderLinks isSpiner={isPending} />}
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      ></Header>
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <ParentZone />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <ChildrenZone />
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <MessageSection />
      </div>
      <Footer />
    </div>
  );
};

export default ParentPage;
