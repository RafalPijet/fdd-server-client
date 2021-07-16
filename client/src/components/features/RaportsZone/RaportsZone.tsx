import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import { getReportsRequest } from '../../../redux/thunks';
import { useStyles } from './RaportZoneStyle';

const RaportsZone: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    dispatch(getReportsRequest());
  }, []);

  return <Card className={cardClasses}>Raport Zone</Card>;
};

export default RaportsZone;
