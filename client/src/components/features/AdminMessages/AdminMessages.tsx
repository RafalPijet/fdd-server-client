import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import MessageIcon from '@material-ui/icons/Message';
import CommentIcon from '@material-ui/icons/Comment';
import RateReviewSharpIcon from '@material-ui/icons/RateReviewSharp';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import CustomNavigation, {
  ItemNaviProps,
} from '../../common/CustomBottomNavigation/CustomBottomNavigation';
import { getUserName } from '../../../redux/actions/userActions';
import { MessageOptions } from '../../../types/global';
import { useStyles, StyleProps, PropsClasses } from './AdminMessagesStyle';

const naviData: ItemNaviProps[] = [
  {
    label: 'Przychodzące',
    value: MessageOptions.incoming,
    icon: <MessageIcon />,
  },
  {
    label: 'Wychodzące',
    value: MessageOptions.outcoming,
    icon: <CommentIcon />,
  },
  {
    label: 'Wszystkie',
    value: MessageOptions.all,
    icon: (
      <span>
        <MessageIcon />
        <CommentIcon />
      </span>
    ),
  },
  {
    label: 'Nowa',
    value: MessageOptions.new,
    icon: <RateReviewSharpIcon />,
  },
];

const AdminMessages: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [messageType, setMessageType] = useState<MessageOptions>(
    MessageOptions.incoming
  );
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardHidden]: isCardAnimation,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

  const messageOptionsHandling = (
    event: React.ChangeEvent<{}>,
    newValue: MessageOptions
  ) => {
    setMessageType(newValue);
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
              items={naviData}
            />
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};

export default AdminMessages;
