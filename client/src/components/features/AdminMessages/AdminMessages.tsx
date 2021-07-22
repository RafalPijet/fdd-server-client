import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import UIfx from 'uifx';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import { Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import CustomNavigation from '../../common/CustomBottomNavigation/CustomBottomNavigation';
import MessagesBody from '../../common/MessagesBody/MessagesBody';
import { getUserName } from '../../../redux/actions/userActions';
import {
  getQuantity,
  loadUserMessages,
  addMessageItemOnFirstPlace,
} from '../../../redux/actions/messageActions';
import {
  getMessages,
  getMessagesSuccess,
  resetMessagesRequest,
  getMessagesError,
} from '../../../redux/actions/requestActions';
import { getToast, setUserToast } from '../../../redux/actions/generalActions';
import {
  getAdminMessages,
  addMessage,
  getAdminMessagesByUser,
  addAnswerToOutsideMessage,
  sendMessageByEmail,
} from '../../../redux/thunks';
import {
  MessageOptions,
  TargetOptions,
  EventChangeReplyData,
} from '../../../types/global';
import {
  setIsRemoved,
  getIsRemoved,
  getEventChange,
  setEventChange,
} from '../../../redux/actions/generalActions';
import { useStyles, Props } from './AdminMessagesStyle';
import { naviAdminMessagesData } from '../../../data/entry';
import { UserName } from '../../common/UsersSearcher/UsersSearcherStyle';
import beepSound from '../../../sounds/beep.mp3';

const AdminMessages: React.FC<Props> = (props) => {
  const { socket } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const eventChange = useSelector(getEventChange);
  const eventData = eventChange.data as EventChangeReplyData;
  const userName = useSelector(getUserName);
  const isPending = useSelector(getMessages);
  const isSuccess = useSelector(getMessagesSuccess);
  const isError = useSelector(getMessagesError).isError;
  const isToast = useSelector(getToast).isOpen;
  const isRemoved = useSelector(getIsRemoved);
  const quantity = useSelector(getQuantity);
  const beep = new UIfx(beepSound);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [isBodyAnimation, setIsBodyAnimation] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<MessageOptions>(
    MessageOptions.incoming
  );
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserName | null>(null);
  const [selectedUserToReply, setSelectedUserToReply] = useState<
    EventChangeReplyData | undefined
  >(undefined);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(6);
  const [isSocket, setIsSocket] = useState<boolean>(true);

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: isCardAnimation,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

  useEffect(() => {
    if (socket && isSocket) {
      socket.on('messageToAdmin', (data) => {
        if (
          (messageType === MessageOptions.incoming ||
            messageType === MessageOptions.all) &&
          data.action === 'new'
        ) {
          beep.play();
          dispatch(addMessageItemOnFirstPlace(data.message, rowsPerPage));
          setIsSocket(false);
          setTimeout(() => setIsSocket(true), 500);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    getAdminMessagesRun();
  }, [messageType, page, rowsPerPage]);

  useEffect(() => {
    if (
      messageType === MessageOptions.search ||
      messageType === MessageOptions.new
    ) {
      if (messageType === MessageOptions.search && selectedUser !== null) {
        if (Object.keys(selectedUser).includes('email') && selectedUser.email) {
          dispatch(
            getAdminMessagesByUser(false, selectedUser.email, page, rowsPerPage)
          );
        } else {
          dispatch(
            getAdminMessagesByUser(true, selectedUser._id, page, rowsPerPage)
          );
        }
      }
      if (messageType === MessageOptions.search && selectedUser === null) {
        setPage(0);
        dispatch(loadUserMessages([], 0));
      }
    }
  }, [messageType, selectedUser, page, rowsPerPage]);

  useEffect(() => {
    if (messageType === MessageOptions.new) {
      if (eventChange.isAction) {
        setIsDisabled(newMessage.length === 0);
      } else {
        setIsDisabled(newMessage.length === 0 || selectedUser === null);
      }
    }
  }, [selectedUser, eventChange.isAction, newMessage.length, messageType]);

  useEffect(() => {
    setIsBodyAnimation(!isPending && isSuccess);
    if (messageType === MessageOptions.new) {
      setNewMessage('');
      setIsBodyAnimation(true);
    }
  }, [isPending, isSuccess, messageType]);

  useEffect(() => {
    if (isToast)
      dispatch(
        setUserToast({
          isOpen: false,
          content: '',
          variant: 'success',
        })
      );
    if (isError) dispatch(resetMessagesRequest());
  }, [isToast, isError]);

  useEffect(() => {
    if (isRemoved) {
      getAdminMessagesRun();
      dispatch(setIsRemoved(false));
    }
  }, [isRemoved]);

  useEffect(() => {
    if (eventChange.isAction) {
      setIsBodyAnimation(false);
      setTimeout(() => {
        if (eventChange.data) setSelectedUserToReply(eventData);
        setMessageType(MessageOptions.new);
        setPage(0);
      }, 300);
    }
  }, [eventChange.isAction]);

  const getAdminMessagesRun = () => {
    if (messageType === MessageOptions.incoming) {
      dispatch(getAdminMessages(TargetOptions.to, page, rowsPerPage));
    } else if (messageType === MessageOptions.outcoming) {
      dispatch(getAdminMessages(TargetOptions.from, page, rowsPerPage));
    } else if (messageType === MessageOptions.all) {
      dispatch(getAdminMessages(TargetOptions.all, page, rowsPerPage));
    }
  };

  const messageOptionsHandling = (
    event: React.ChangeEvent<{}>,
    newValue: MessageOptions
  ) => {
    if (newValue !== messageType) {
      setIsBodyAnimation(false);
      setSelectedUser(null);
      setSelectedUserToReply(undefined);
      setTimeout(() => {
        setPage(0);
        setMessageType(newValue);
        if (eventChange.isAction) {
          dispatch(setEventChange({ isAction: false, data: undefined }));
        }
      }, 300);
    }
  };

  const selectedUserHandling = (user: UserName | null) => {
    if (
      messageType === MessageOptions.new ||
      messageType === MessageOptions.search
    ) {
      setSelectedUser(user);
    }
  };

  const newMessageHandling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sendMessageHandling = () => {
    if (eventChange.isAction && selectedUserToReply !== undefined) {
      if (
        Object.keys(selectedUserToReply).length === 2 &&
        selectedUserToReply.userId
      ) {
        dispatch(addMessage(newMessage, selectedUserToReply.userId));
      }
      if (
        Object.keys(selectedUserToReply).length === 3 &&
        selectedUserToReply.messageId
      ) {
        dispatch(
          addAnswerToOutsideMessage(
            newMessage,
            selectedUserToReply.email!,
            selectedUserToReply.name,
            selectedUserToReply.messageId
          )
        );
      }
      dispatch(setEventChange({ isAction: false, data: undefined }));
      setSelectedUserToReply(undefined);
    } else {
      if (newMessage.length > 0 && selectedUser !== null) {
        if (!Object.keys(selectedUser).includes('email')) {
          dispatch(addMessage(newMessage, selectedUser._id));
        } else {
          dispatch(
            sendMessageByEmail(
              newMessage,
              selectedUser.email!,
              selectedUser.name
            )
          );
        }
      }
    }
    setNewMessage('');
  };

  return (
    <div>
      <Zoom in={!isCardAnimation} timeout={1000}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: '50px' }}
        >
          Witaj {userName}
        </Typography>
      </Zoom>
      <Card className={cardClasses}>
        <div
          style={{
            margin: '0 auto',
          }}
        >
          <CardHeader className={classes.cardHeader} color="primaryCardHeader">
            <CustomNavigation
              disabled={isPending}
              onChange={messageOptionsHandling}
              value={messageType}
              items={naviAdminMessagesData}
            />
          </CardHeader>
        </div>
        <Grow in={isBodyAnimation}>
          <CardBody>
            <MessagesBody
              messageType={messageType}
              disabled={isPending}
              label="wiadomość"
              value={newMessage}
              onChange={newMessageHandling}
              getSelectedUser={selectedUserHandling}
              isAdmin={true}
            />
          </CardBody>
        </Grow>
        <CardFooter className={classes.cardFooter}>
          {messageType !== MessageOptions.new ? (
            <CustomPagination
              rowsPerPageOptions={[6, 10, 20]}
              isHidden={isPending}
              quantity={quantity}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              label="Ilość wiadomości"
            />
          ) : (
            <CustomButton
              disabled={isPending || isDisabled}
              setColor="primary"
              setSize="md"
              onClick={sendMessageHandling}
            >
              Wyślij
            </CustomButton>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminMessages;
