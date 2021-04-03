import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { VariantType, useSnackbar } from 'notistack';
import { useStyles, StyleProps } from './AdminPageStyle';
import { getPending, getError } from '../../../redux/actions/requestActions';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksAdminPage';
import Jumbotron from '../../common/Jumbotron/Jumbotron';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Footer from '../../common/Footer/Footer';
import AdminMessages from '../../features/AdminMessages/AdminMessages';
import RaportsZone from '../../features/RaportsZone/RaportsZone';
import ModalAreYouSure from '../../common/ModalAreYouSure/ModalAreYouSure';
import { cleanCurrentUser } from '../../../redux/actions/userActions';
import { resetRequest } from '../../../redux/actions/requestActions';
import {
  getToast,
  setUserToast,
  getModalAreYouSure,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import { removeMessage } from '../../../redux/thunks';
import { ModalAYSModes } from '../../../types/global';
import { loadUserMessages } from '../../../redux/actions/messageActions';
import image from '../../../images/jumbotronAdmin.jpg';

const AdminPage: React.FC = () => {
  const classes = useStyles({} as StyleProps);
  const isPending = useSelector(getPending);
  const toast = useSelector(getToast);
  const modalAYS = useSelector(getModalAreYouSure);
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
    const { messageId, isUser } = modalAYS.data;
    if (isConfirm) {
      if (modalAYS.mode === ModalAYSModes.removeMessage) {
        if (messageId !== undefined && isUser !== undefined) {
          dispatch(removeMessage(messageId, isUser));
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
              <AdminMessages />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <RaportsZone />
            </GridItem>
          </GridContainer>
        </div>
      </Jumbotron>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ height: '800px' }}>Preparing...</div>
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
