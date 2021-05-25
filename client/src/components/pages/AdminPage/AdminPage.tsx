import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import { useStyles, StyleProps } from './AdminPageStyle';
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
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import AdminMessages from '../../features/AdminMessages/AdminMessages';
import RaportsZone from '../../features/RaportsZone/RaportsZone';
import SearcherOfUsers from '../../features/SearcherOfUsers/SearcherOfUsers';
import ModalAreYouSure from '../../common/ModalAreYouSure/ModalAreYouSure';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import {
  getToast,
  setUserToast,
  getModalAreYouSure,
  setModalAreYouSure,
  setSelectedChild,
  setSelectedPerson,
  setSelectedUserType,
} from '../../../redux/actions/generalActions';
import { removeMessage, updateUserStatus } from '../../../redux/thunks';
import { ModalAYSModes, SearchUserType } from '../../../types/global';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import AdminContent from '../../features/AdminContent/AdminContent';
import image from '../../../images/jumbotronAdmin.jpg';

const AdminPage: React.FC = () => {
  const classes = useStyles({} as StyleProps);
  const isPending = useSelector(getPending);
  const isUpdating = useSelector(getUpdating);
  const isAdding = useSelector(getAdding);
  const isMessages = useSelector(getMessages);
  const toast = useSelector(getToast);
  const modalAYS = useSelector(getModalAreYouSure);
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
      dispatch(resetUpdatingRequest());
    }
    if (addingError.isError) {
      handleToast(addingError.message, 'error');
      dispatch(resetAddingRequest());
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
      dispatch(setSelectedChild(null));
      dispatch(setSelectedPerson(null));
      dispatch(setSelectedUserType(SearchUserType.child));
      dispatch(loadUserMessages([], 0));
      dispatch(
        setUserToast({
          isOpen: false,
          content: '',
          variant: 'success',
        })
      );
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
  }, []);

  const handleToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const handleModalAYS = (isConfirm: boolean) => {
    if (isConfirm) {
      if (modalAYS.mode === ModalAYSModes.removeMessage) {
        const { messageId, isUser } = modalAYS.data;
        if (messageId !== undefined && isUser !== undefined) {
          dispatch(removeMessage(messageId, isUser));
        }
      }
      if (modalAYS.mode === ModalAYSModes.changeUserStatus) {
        const { userId, userStatus } = modalAYS.data;
        if (userId !== undefined && userStatus !== undefined) {
          dispatch(updateUserStatus(userId, userStatus));
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

  return (
    <div>
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
              <AdminMessages />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <RaportsZone />
              <SearcherOfUsers />
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ height: '2500px' }}>
          <AdminContent />
        </div>
      </div>
      <Footer />
      <ModalAreYouSure
        isOpen={modalAYS.isOpen}
        title={modalAYS.title}
        descriprion={modalAYS.description}
        isConfirm={handleModalAYS}
      />
    </div>
  );
};

export default AdminPage;
