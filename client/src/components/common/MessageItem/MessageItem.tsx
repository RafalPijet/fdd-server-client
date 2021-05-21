import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
    userEmail,
    userName,
    isUser,
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
    [classes.unread]:
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && from === userId)
        ? false
        : isUnread,
    [classes.selected]: isSelected,
    [classes.right]:
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && from === userId) ||
      (dataType === MessageOptions.search && from === userId),
  });

  useEffect(() => {
    setIsSelected(selectedId === _id);
  }, [selectedId]);

  useEffect(() => {
    setIsUnread(isNew);
  }, [isNew]);

  useEffect(() => {
    return () => {
      setIsSelected(false);
      setIsUnread(false);
    };
  }, []);

  const clickHandling = () => {
    getData(
      _id,
      message,
      from === userId ? false : isNew,
      userName,
      userEmail,
      from === userId,
      isUser,
      from
    );
  };
  const itemContent = () => {
    if (
      dataType === MessageOptions.incoming ||
      (dataType === MessageOptions.all && from !== userId) ||
      (dataType === MessageOptions.search && from !== userId)
    ) {
      return (
        <span className={classes.common}>
          <span className={classes.message}>
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
            <span>{cutText(message, 50)}</span>
          </span>
          <ArrowDownwardIcon className={classes.icon} fontSize="default" />
        </span>
      );
    } else if (
      dataType === MessageOptions.outcoming ||
      (dataType === MessageOptions.all && from === userId) ||
      (dataType === MessageOptions.search && from === userId)
    ) {
      return (
        <span className={classes.common}>
          <ArrowUpwardIcon fontSize="default" className={classes.icon} />
          <span className={classes.message}>
            <span>{cutText(message, 50)}</span>
            <span className={classes.date}>{` : ${date.substring(
              0,
              10
            )}`}</span>
          </span>
        </span>
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
