import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getUserName } from '../../../redux/actions/userActions';
import { getToast, setUserToast } from '../../../redux/actions/generalActions';
import { getQuantity } from '../../../redux/actions/messageActions';
import { Typography } from '@material-ui/core';
import { useStyles, Props } from './ParentMessagesStyle';
import { MessageOptions } from '../../../types/global';
import { addMessage, getUserMessages } from '../../../redux/thunks';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import { TargetOptions } from '../../../types/global';
import {
  getMessages,
  getMessagesSuccess,
  resetMessagesRequest,
  getMessagesError,
} from '../../../redux/actions/requestActions';
import { addMessageItemOnFirstPlace } from '../../../redux/actions/messageActions';
import CustomBottomNavigation from '../../common/CustomBottomNavigation/CustomBottomNavigation';
import MessagesBody from '../../common/MessagesBody/MessagesBody';
import { naviMessagesData } from '../../../data/entry';

const ParentMessages: React.FC<Props> = (props) => {
  const { socket } = props;
  const classes = useStyles();
  const userName = useSelector(getUserName);
  const isPending = useSelector(getMessages);
  const isSuccess = useSelector(getMessagesSuccess);
  const isError = useSelector(getMessagesError).isError;
  const isToast = useSelector(getToast).isOpen;
  const quantity = useSelector(getQuantity);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [isBodyAnimation, setIsBodyAnimation] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<MessageOptions>(
    MessageOptions.incoming
  );
  const [newMessage, setNewMessage] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [isSocket, setIsSocket] = useState<boolean>(true);

  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  const dispatch = useDispatch();

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

  useEffect(() => {
    if (socket && isSocket) {
      socket.on('messageToParent', (data) => {
        if (
          (messageType === MessageOptions.incoming ||
            messageType === MessageOptions.all) &&
          data.action === 'new'
        ) {
          dispatch(addMessageItemOnFirstPlace(data.message));
          setIsSocket(false);
          setTimeout(() => setIsSocket(true), 500);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (messageType === MessageOptions.incoming) {
      dispatch(getUserMessages(TargetOptions.to, page, rowsPerPage));
    } else if (messageType === MessageOptions.outcoming) {
      dispatch(getUserMessages(TargetOptions.from, page, rowsPerPage));
    } else if (messageType === MessageOptions.all) {
      dispatch(getUserMessages(TargetOptions.all, page, rowsPerPage));
    }
  }, [messageType, page, rowsPerPage]);

  useEffect(() => {
    setIsBodyAnimation(!isPending && isSuccess);
    setIsDisabled(isPending);
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

  const messageOptionsHandling = (
    event: React.ChangeEvent<{}>,
    newValue: MessageOptions
  ) => {
    if (newValue !== messageType) {
      setPage(0);
      setIsBodyAnimation(false);
      setTimeout(() => {
        setMessageType(newValue);
        dispatch(resetMessagesRequest());
      }, 300);
    }
  };

  const newMessageHandling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const setMessageHandling = () => {
    if (newMessage.length > 0) {
      dispatch(addMessage(newMessage));
    }
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
            <CustomBottomNavigation
              disabled={isDisabled}
              value={messageType}
              onChange={messageOptionsHandling}
              items={naviMessagesData}
            />
          </CardHeader>
        </div>
        <Grow in={isBodyAnimation}>
          <CardBody>
            <MessagesBody
              messageType={messageType}
              disabled={isDisabled}
              label="wiadomość"
              value={newMessage}
              onChange={newMessageHandling}
              isAdmin={false}
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
              disabled={isDisabled || newMessage.length === 0}
              setColor="primary"
              setSize="md"
              onClick={setMessageHandling}
            >
              Wyślij
            </CustomButton>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentMessages;
