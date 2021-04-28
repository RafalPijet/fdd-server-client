import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import { useStyles, StyleProps } from './ParentPageStyle';
import {
  getPending,
  getError,
  resetRequest,
  getUpdating,
  getUpdatingError,
  resetUpdatingRequest,
  getAdding,
  getAddingError,
  resetAddingRequest,
} from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksParentPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import ParentMessages from '../../features/ParentMessages/ParentMessages';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import ChildHandling from '../../common/ChildHandling/ChildHandling';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import {
  getToast,
  setUserToast,
  setSelectedChild,
} from '../../../redux/actions/generalActions';
import image from '../../../images/jumbotronParent.jpg';

const ParentPage: React.FC = () => {
  const classes = useStyles({} as StyleProps);
  const isPending = useSelector(getPending);
  const isUpdating = useSelector(getUpdating);
  const isAdding = useSelector(getAdding);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const updatingError = useSelector(getUpdatingError);
  const addingError = useSelector(getAddingError);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
      handleToast(error.message, 'error');
    }
    if (updatingError.isError) {
      handleToast(updatingError.message, 'error');
    }
    if (addingError.isError) {
      handleToast(addingError.message, 'error');
    }
  }, [toast.isOpen, error.isError, updatingError.isError, addingError.isError]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('tokenFDD');
      localStorage.removeItem('expiresInFDD');
      dispatch(cleanCurrentUser());
      dispatch(resetRequest());
      dispatch(resetUpdatingRequest());
      dispatch(resetAddingRequest());
      dispatch(loadUserMessages([], 0));
      dispatch(setSelectedChild(null));
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
        isSpiner={isPending || isUpdating || isAdding}
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        rightLinks={
          <HeaderLinks isSpiner={isPending || isUpdating || isAdding} />
        }
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      ></Header>
      <Jumbotron filter image={image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <ParentMessages />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <ChildrenZone />
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ height: '1800px' }}>
          <ChildHandling />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ParentPage;
