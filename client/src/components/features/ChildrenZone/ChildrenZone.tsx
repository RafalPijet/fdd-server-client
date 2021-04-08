import React, { useState } from 'react';
import classNames from 'classnames';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import Paper from '@material-ui/core/Paper';
import { useStyles, StyleProps, PropsClasses } from './ChildrenZoneStyle';
import Avatar from '@material-ui/core/Avatar';
import image from '../../../images/lopez-face.jpg';

const ChildrenZone: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);
  return (
    <div>
      <Card className={cardClasses}>
        <div className={classes.rowHeader}>
          <CardHeader className={classes.cardHeader} color="infoCardHeader">
            <span>Rafał Pijet</span>
            <Avatar
              variant="rounded"
              src={image}
              alt="Strong Lopez"
              className={classes.large}
            />
            <span>ur. 22.04.1973</span>
          </CardHeader>
          <CardHeader className={classes.description} color="infoCardHeader">
            <p className={classes.content}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </CardHeader>
        </div>
        <CardBody>
          <CustomCarousel />
        </CardBody>
      </Card>
    </div>
  );
};

export default ChildrenZone;
