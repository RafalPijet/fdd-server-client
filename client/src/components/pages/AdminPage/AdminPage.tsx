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
} from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import AdminMessages from '../../features/AdminMessages/AdminMessages';
import RaportsZone from '../../features/RaportsZone/RaportsZone';
import SearcherOfUsers from '../../features/SearcherOfUsers/SearcherOfUsers';
import ModalAreYouSure from '../../common/ModalAreYouSure/ModalAreYouSure';
import {
  getToast,
  getModalAreYouSure,
  setModalAreYouSure,
  setSelectedChild,
  setSelectedPerson,
  setSelectedUserType,
  setSelectedQuantity,
} from '../../../redux/actions/generalActions';
import { removeMessage, updateUserStatus } from '../../../redux/thunks';
import { ModalAYSModes, SearchUserType } from '../../../types/global';
import AdminContent from '../../features/AdminContent/AdminContent';
import image from '../../../images/jumbotronAdmin.jpg';
import { useStyles } from './AdminPageStyle';

const AdminPage: React.FC = () => {
  const classes = useStyles();
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
    window.scrollTo(0, 0);
    return () => {
      dispatch(setSelectedChild(null));
      dispatch(setSelectedPerson(null));
      dispatch(setSelectedQuantity(null));
      dispatch(setSelectedUserType(SearchUserType.child));
    };
  }, []);

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
      if (modalAYS.mode === ModalAYSModes.removeChild) {
        console.log('Remove child');
        console.log(modalAYS.data.childId);
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
        <div>
          <AdminContent />
        </div>
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

export default AdminPage;
