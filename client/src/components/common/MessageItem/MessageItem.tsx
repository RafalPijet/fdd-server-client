import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../redux/actions/userActions';
import { Props, StyleProps, PropsClasses, useStyles } from './MessageItemStyle';
import Paper from '@material-ui/core/Paper';
import { cutText } from '../../../types/functions';
import { MessageOptions } from '../../../types/global';
import image from '../../../images/butterflyMini.png';

const MessageItem: React.FC<Props> = (props) => {
  const {
    isNew,
    message,
    date,
    _id,
    getData,
    selectedId,
    dataType,
    from,
    ...rest
  } = props;
  const [isUnread, setIsUnread] = useState<boolean>(
    (dataType === MessageOptions.incoming && isNew) ||
      (dataType === MessageOptions.all && isNew)
  );
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const userId = useSelector(getUserId);
  const contentClasses = classNames({
    [classes.content]: true,
    [classes.unread]: isUnread,
    [classes.selected]: isSelected,
    [classes.right]:
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && from === userId),
  });

  useEffect(() => {
    setIsSelected(selectedId === _id);
  }, [selectedId]);

  useEffect(() => {
    return () => {
      setIsSelected(false);
      setIsUnread(false);
    };
  }, []);

  const clickHandling = () => {
    getData(_id, message, isNew);
    // setIsUnread(!isUnread);
    // setIsSelected(true);
  };
  const itemContent = () => {
    if (
      dataType === MessageOptions.incoming ||
      (dataType === MessageOptions.all && from !== userId)
    ) {
      return (
        <>
          <span className={classes.date}>
            {isUnread ? (
              <>
                <img className={classes.image} src={image} alt="logo" />
                {date.substring(0, 10)}
              </>
            ) : (
              date.substring(0, 10)
            )}
            :
          </span>
          {cutText(message, 50)}
        </>
      );
    } else if (
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && from === userId)
    ) {
      return (
        <>
          {cutText(message, 50)}
          <span className={classes.date}>{` : ${date.substring(0, 10)}`}</span>
        </>
      );
    }
  };

  return (
    <Paper elevation={isSelected ? 2 : 5} className={classes.root} {...rest}>
      <p onClick={clickHandling} className={contentClasses}>
        {itemContent()}
      </p>
    </Paper>
  );
};

export default MessageItem;
