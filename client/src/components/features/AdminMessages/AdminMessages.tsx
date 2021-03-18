import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import { Typography } from '@material-ui/core';
import MessageContent from '../../common/MessagesContent/MessagesContent';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import CustomNavigation from '../../common/CustomBottomNavigation/CustomBottomNavigation';
import MessagesBody from '../../common/MessagesBody/MessagesBody';
import { getUserName } from '../../../redux/actions/userActions';
import {
  getToast,
  setUserToast,
  getQuantity,
} from '../../../redux/actions/messageActions';
import {
  getPending,
  getSuccess,
  resetRequest,
  getError,
} from '../../../redux/actions/requestActions';
import { MessageOptions } from '../../../types/global';
import { useStyles, StyleProps, PropsClasses } from './AdminMessagesStyle';
import { naviMessagesData } from '../../../data/entry';

const AdminMessages: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const isError = useSelector(getError).isError;
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
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: isCardAnimation,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

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
    if (isError) dispatch(resetRequest());
  }, [isToast, isError]);

  const messageOptionsHandling = (
    event: React.ChangeEvent<{}>,
    newValue: MessageOptions
  ) => {
    setMessageType(newValue);
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

  const setMessageHandling = () => {
    if (newMessage.length > 0) {
      console.log(newMessage);
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
            <CustomNavigation
              disabled={isDisabled}
              onChange={messageOptionsHandling}
              value={messageType}
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

export default AdminMessages;
