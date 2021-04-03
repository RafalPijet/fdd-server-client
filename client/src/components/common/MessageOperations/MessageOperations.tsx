import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import { MessageOptions } from '../../../types/global';
import { setModalAreYouSure } from '../../../redux/actions/generalActions';
import { ModalAYSModes } from '../../../types/global';
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
    dispatch(
      setModalAreYouSure({
        mode: ModalAYSModes.removeMessage,
        isOpen: true,
        title: 'Chcesz usunąć wiadomość?',
        description: `Wiadomość ${directionHandling(
          true
        )} ${userName} zostanie usunięta na stałe!`,
        data: {
          messageId,
          isUser,
        },
      })
    );
  };

  const directionHandling = (isMessage: boolean) => {
    if (
      dataType === MessageOptions.incoming ||
      (dataType === MessageOptions.all && !isAdminMessage)
    ) {
      return isMessage ? 'od' : <span className={classes.direction}>od:</span>;
    } else if (
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && isAdminMessage)
    ) {
      return isMessage ? 'do' : <span className={classes.direction}>do:</span>;
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
        {directionHandling(false)}
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
