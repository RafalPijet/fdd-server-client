import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getUserName } from '../../../redux/actions/userActions';
import { getToast, setUserToast } from '../../../redux/actions/messageActions';
import { Typography } from '@material-ui/core';
import { PropsClasses, useStyles, StyleProps } from './ParentZoneStyle';
import { MessageOptions } from '../../../types/global';
import { addMessage, getUserMessages } from '../../../redux/thunks';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import MessageIcon from '@material-ui/icons/Message';
import CommentIcon from '@material-ui/icons/Comment';
import RateReviewSharpIcon from '@material-ui/icons/RateReviewSharp';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomInput from '../../common/CustomInput/CustomInput';
import MessagesContent from '../../common/MessagesContent/MessagesContent';
import { TargetOptions } from '../../../types/global';
import {
  getPending,
  getSuccess,
  resetRequest,
  getError,
} from '../../../redux/actions/requestActions';

const ParentZone: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const userName = useSelector(getUserName);
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const isError = useSelector(getError).isError;
  const isToast = useSelector(getToast).isOpen;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [cardAnimation, setCardAnimation] = useState<boolean>(true);
  const [bodyAnimation, setBodyAnimation] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<MessageOptions>(
    MessageOptions.incoming
  );
  const [newMessage, setNewMessage] = useState<string>('');
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: cardAnimation,
  });
  const dispatch = useDispatch();
  const busyClasses = classNames({
    [classes.busy]: isDisabled,
  });
  setTimeout(() => {
    setCardAnimation(false);
  }, 700);

  useEffect(() => {
    if (messageType === MessageOptions.incoming) {
      dispatch(getUserMessages(TargetOptions.to));
    } else if (messageType === MessageOptions.outcoming) {
      dispatch(getUserMessages(TargetOptions.from));
    } else if (messageType === MessageOptions.all) {
      dispatch(getUserMessages(TargetOptions.all));
    }
  }, [messageType]);

  useEffect(() => {
    setBodyAnimation(!isPending && isSuccess);
    setIsDisabled(isPending);
    if (messageType === MessageOptions.new) {
      setNewMessage('');
      setBodyAnimation(true);
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
    setBodyAnimation(false);
    setTimeout(() => {
      setMessageType(newValue);
      dispatch(resetRequest());
    }, 300);
  };

  const newMessageHandling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const setMessageHandling = () => {
    dispatch(addMessage(newMessage));
  };

  const bodyContent = () => {
    if (messageType === MessageOptions.all) {
      return <MessagesContent dataType={messageType} />;
    } else if (messageType === MessageOptions.incoming) {
      return <MessagesContent dataType={messageType} />;
    } else if (messageType === MessageOptions.outcoming) {
      return <MessagesContent dataType={messageType} />;
    } else if (messageType === MessageOptions.new) {
      return (
        <div>
          <CustomInput
            isDisabled={isDisabled}
            labelText="wiadomość"
            id="newMessage"
            value={newMessage}
            onChange={newMessageHandling}
            formControlProps={{
              fullWidth: true,
            }}
            white
            inputProps={{
              multiline: true,
              rows: 7,
              autoFocus: true,
            }}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Zoom in={!cardAnimation} timeout={1000}>
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
            <BottomNavigation
              onChange={messageOptionsHandling}
              value={messageType}
              style={{ backgroundColor: 'transparent' }}
            >
              <BottomNavigationAction
                disabled={isDisabled}
                className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Przychodzące"
                value={MessageOptions.incoming}
                style={{ color: '#fff' }}
                icon={<MessageIcon />}
              />
              <BottomNavigationAction
                disabled={isDisabled}
                className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Wychodzące"
                value={MessageOptions.outcoming}
                style={{ color: '#fff' }}
                icon={<CommentIcon />}
              />
              <BottomNavigationAction
                disabled={isDisabled}
                className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Wszystkie"
                value={MessageOptions.all}
                style={{ color: '#fff' }}
                icon={
                  <span>
                    <MessageIcon />
                    <CommentIcon />
                  </span>
                }
              />
              <BottomNavigationAction
                disabled={isDisabled}
                className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Nowa"
                value={MessageOptions.new}
                style={{ color: '#fff' }}
                icon={<RateReviewSharpIcon />}
              />
            </BottomNavigation>
          </CardHeader>
        </div>
        <Grow in={bodyAnimation}>
          <CardBody>{bodyContent()}</CardBody>
        </Grow>
        <CardFooter className={classes.cardFooter}>
          <CustomButton
            setColor="primary"
            setSize="md"
            onClick={setMessageHandling}
          >
            Wyslij
          </CustomButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentZone;
