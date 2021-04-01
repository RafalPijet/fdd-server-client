import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import { MessageOptions } from '../../../types/global';
import {
  setModalAreYouSure,
  getModalAreYouSure,
} from '../../../redux/actions/generalActions';
import {
  Props,
  PropsClasses,
  useStyles,
  StyleProps,
} from './MessageOperationsStyle';

const MessageOperations: React.FC<Props> = (props) => {
  const {
    userName,
    userEmail,
    messageId,
    dataType,
    isAdminMessage,
    isUser,
  } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isIncoming, setIsIncoming] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsIncoming(
      dataType === MessageOptions.incoming ||
        (dataType === MessageOptions.all && !isAdminMessage)
    );
  }, [dataType, isAdminMessage]);

  const deleteMessageHandling = () => {
    console.log(isUser);
    console.log(userName);
    console.log(userEmail);
    console.log(messageId);
    dispatch(
      setModalAreYouSure({
        isOpen: true,
        title: 'Chcesz usunąć wiadomość?',
        description: `Wiadomość od ${userName} zostanie usunięta na stałe!`,
        data: {
          messageId,
          isUser,
        },
      })
    );
  };

  const directionHandling = () => {
    if (
      dataType === MessageOptions.incoming ||
      (dataType === MessageOptions.all && !isAdminMessage)
    ) {
      return <span className={classes.direction}>od:</span>;
    } else if (
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && isAdminMessage)
    ) {
      return <span className={classes.direction}>do:</span>;
    }
  };
  return (
    <div className={classes.root}>
      <IconButton
        onClick={deleteMessageHandling}
        className={classes.buttonDelete}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
      <span className={classes.userInfo}>
        {directionHandling()}
        {userName}
        {isIncoming && (
          <IconButton className={classes.buttonReply}>
            <ReplyIcon fontSize="small" />
          </IconButton>
        )}
      </span>
    </div>
  );
};

export default MessageOperations;
