import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getUserName } from '../../../redux/actions/userActions';
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

const ParentZone: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const userName = useSelector(getUserName);
  const [cardAnimation, setCardAnimation] = useState(true);
  const [bodyAnimation, setBodyAnimation] = useState(true);
  const [messageType, setMessageType] = useState<MessageOptions>(
    MessageOptions.incoming
  );
  const [newMessage, setNewMessage] = useState<string>('');
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: cardAnimation,
  });
  const dispatch = useDispatch();
  setTimeout(() => {
    setCardAnimation(false);
  }, 700);

  const messageOptionsHandling = (
    event: React.ChangeEvent<{}>,
    newValue: MessageOptions
  ) => {
    // setBodyAnimation(false);
    setTimeout(() => setMessageType(newValue), 300);
  };

  const newMessageHandling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const bodyContent = () => {
    if (messageType === MessageOptions.all) {
      return <div>All</div>;
    } else if (messageType === MessageOptions.incoming) {
      return <div>Incoming</div>;
    } else if (messageType === MessageOptions.outcoming) {
      return <MessagesContent />;
    } else if (messageType === MessageOptions.new) {
      return (
        <div>
          <CustomInput
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

  const click = () => {
    // setBodyAnimation(!bodyAnimation);
    dispatch(getUserMessages(TargetOptions.from));
  };

  const setMessageHandling = () => {
    dispatch(addMessage(newMessage));
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
                // disabled={isDisabled}
                // className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Przychodzące"
                value={MessageOptions.incoming}
                style={{ color: '#fff' }}
                icon={<CommentIcon />}
              />
              <BottomNavigationAction
                // disabled={isDisabled}
                // className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Wychodzące"
                value={MessageOptions.outcoming}
                style={{ color: '#fff' }}
                icon={<MessageIcon />}
              />
              <BottomNavigationAction
                // disabled={isDisabled}
                // className={busyClasses}
                classes={{
                  selected: classes.selectTab,
                }}
                label="Wszystkie"
                value={MessageOptions.all}
                style={{ color: '#fff' }}
                icon={
                  <span>
                    <CommentIcon />
                    <MessageIcon />
                  </span>
                }
              />
              <BottomNavigationAction
                // disabled={isDisabled}
                // className={busyClasses}
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
          <CustomButton setColor="primary" setSize="md" onClick={click}>
            Wyslij
          </CustomButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ParentZone;
