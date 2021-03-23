import React, { useState, useEffect } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import { MessageOptions } from '../../../types/global';
import {
  Props,
  PropsClasses,
  useStyles,
  StyleProps,
} from './MessageOperationsStyle';

const MessageOperations: React.FC<Props> = (props) => {
  const { userName, userEmail, messageId, dataType, isAdminMessage } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isIncoming, setIsIncoming] = useState<boolean>(false);

  useEffect(() => {
    setIsIncoming(
      dataType === MessageOptions.incoming ||
        (dataType === MessageOptions.all && !isAdminMessage)
    );
  }, [dataType, isAdminMessage]);

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
      <IconButton className={classes.buttonDelete}>
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
