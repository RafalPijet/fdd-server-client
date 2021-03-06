import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
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
  getMessages,
  getMessagesError,
  resetMessagesRequest,
} from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksParentPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import ParentMessages from '../../features/ParentMessages/ParentMessages';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import ChildHandling from '../../common/ChildHandling/ChildHandling';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import { AvailableDestinations } from '../../../types/global';
import {
  getToast,
  setUserToast,
  setSelectedChild,
} from '../../../redux/actions/generalActions';
import { useStyles, StyleProps } from './ParentPageStyle';
import image from '../../../images/jumbotronParent.jpg';

const ParentPage: React.FC = () => {
  const classes = useStyles({} as StyleProps);
  const isPending = useSelector(getPending);
  const isUpdating = useSelector(getUpdating);
  const isAdding = useSelector(getAdding);
  const isMessages = useSelector(getMessages);
  const toast = useSelector(getToast);
  const error = useSelector(getError);
  const updatingError = useSelector(getUpdatingError);
  const addingError = useSelector(getAddingError);
  const messagesError = useSelector(getMessagesError);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

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
    }
    if (addingError.isError) {
      handleToast(addingError.message, 'error');
    }
    if (messagesError.isError) {
      handleToast(messagesError.message, 'error');
    }
  }, [
    toast.isOpen,
    error.isError,
    updatingError.isError,
    addingError.isError,
    messagesError.isError,
  ]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('tokenFDD');
      localStorage.removeItem('expiresInFDD');
      dispatch(cleanCurrentUser());
      dispatch(resetRequest());
      dispatch(resetUpdatingRequest());
      dispatch(resetAddingRequest());
      dispatch(resetMessagesRequest());
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
    <div id={AvailableDestinations.mainParent}>
      <Header
        isSpiner={isPending || isUpdating || isAdding || isMessages}
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        fixed
        rightLinks={
          <HeaderLinks
            isSpiner={isPending || isUpdating || isAdding || isMessages}
          />
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
        <div style={{ height: '3000px' }}>
          <ChildHandling />
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
