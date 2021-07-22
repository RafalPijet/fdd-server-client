import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import openSocket from 'socket.io-client';
import UIfx from 'uifx';
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
} from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksParentPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import ParentMessages from '../../features/ParentMessages/ParentMessages';
import ChildrenZone from '../../features/ChildrenZone/ChildrenZone';
import ChildHandling from '../../common/ChildHandling/ChildHandling';
import {
  cleanCurrentUser,
  getUserId,
  updateChildStatus,
} from '../../../redux/actions/userActions';
import { AvailableDestinations } from '../../../types/global';
import {
  getToast,
  setUserToast,
  setSelectedChild,
} from '../../../redux/actions/generalActions';
import { getUserRequest } from '../../../redux/thunks';
import { useStyles } from './ParentPageStyle';
import { URL } from '../../../config';
import image from '../../../images/jumbotronParent.jpg';
import notificationSound from '../../../sounds/notification.wav';
import loginEnterSound from '../../../sounds/loginEnter.wav';
import warningSound from '../../../sounds/warning.wav';

const ParentPage: React.FC = () => {
  const classes = useStyles();
  const userId = useSelector(getUserId);
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
  const socket = useMemo(() => openSocket(URL), []);
  const notification = new UIfx(notificationSound);
  const loginEnter = new UIfx(loginEnterSound);
  const warning = new UIfx(warningSound);

  useEffect(() => {
    if (!userId) {
      dispatch(getUserRequest());
    } else {
      loginEnter.play(0.5);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('update', (data) => {
        if (data.action === 'childStatus' && data.parentId === userId) {
          dispatch(updateChildStatus(data.childId, data.isActive));
          notification.play(0.5);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (toast.isOpen) {
      notification.play(0.5);
      handleToast(toast.content, toast.variant);
    }
    if (error.isError) {
      warning.play(0.5);
      handleToast(error.message, 'error');
      dispatch(resetRequest());
    }
    if (updatingError.isError) {
      warning.play(0.5);
      handleToast(updatingError.message, 'error');
    }
    if (addingError.isError) {
      warning.play(0.5);
      handleToast(addingError.message, 'error');
    }
    if (messagesError.isError) {
      warning.play(0.5);
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
      dispatch(cleanCurrentUser());
      dispatch(resetRequest());
      dispatch(resetUpdatingRequest());
      dispatch(resetAddingRequest());
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
              <ParentMessages socket={socket} />
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
