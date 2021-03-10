import React, { useState } from 'react';
import classNames from 'classnames';
import { Props, StyleProps, PropsClasses, useStyles } from './MessageItemStyle';
import Paper from '@material-ui/core/Paper';
import { cutText } from '../../../types/functions';
import image from '../../../images/butterflyMini.png';

const MessageItem: React.FC<Props> = (props) => {
  const { message, date, _id, ...rest } = props;
  const [isUnread, setIsUnread] = useState(true);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const contentClasses = classNames({
    [classes.content]: true,
    [classes.unread]: isUnread,
  });
  const click = () => {
    console.log('click');
    setIsUnread(!isUnread);
  };
  return (
    <Paper elevation={3} className={classes.root} {...rest}>
      <p onClick={click} className={contentClasses}>
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
      </p>
    </Paper>
  );
};

export default MessageItem;
