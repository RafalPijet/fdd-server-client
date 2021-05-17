import React, { useState } from 'react';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import { useStyles, StyleProps, PropsClasses } from './RaportZoneStyle';

const RaportsZone: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);
  return <Card className={cardClasses}>Raport Zone</Card>;
};

export default RaportsZone;
