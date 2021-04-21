import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import CardBody from '../../common/CardBody/CardBody';
import { getSelectedChild } from '../../../redux/actions/generalActions';
import { getUserChildren } from '../../../redux/actions/userActions';
import { useStyles, StyleProps, PropsClasses } from './ChildrenZoneStyle';
import { ChildState } from '../../../types/global';
import { calculateAge } from '../../../types/functions';

const ChildrenZone: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [selectedChild, setSelectedChild] = useState<ChildState | null>(null);
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  const childId = useSelector(getSelectedChild);
  const children = useSelector(getUserChildren);
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    prepareSelectedChild();
  }, [childId]);

  const prepareSelectedChild = () => {
    if (childId !== null) {
      const child = children.find((item: ChildState) => item._id === childId);
      child !== undefined ? setSelectedChild(child) : setSelectedChild(null);
    }
  };

  return (
    <div>
      <Card className={cardClasses}>
        <div className={classes.rowHeader}>
          <CardHeader className={classes.cardHeader} color="infoCardHeader">
            <span>
              {selectedChild?.firstName} {selectedChild?.lastName}
            </span>
            <Avatar
              variant="rounded"
              src={selectedChild?.images[0]}
              alt={`${selectedChild?.firstName} ${selectedChild?.lastName}`}
              className={classes.large}
            />
            <span>
              {selectedChild !== null
                ? calculateAge(selectedChild.birthDate.toString(), true)
                : ''}
            </span>
          </CardHeader>
          <CardHeader className={classes.description} color="infoCardHeader">
            <p className={classes.content}>
              {selectedChild?.info.length
                ? selectedChild?.info
                : 'Podopieczny nie został jeszcze przydzielony'}
            </p>
          </CardHeader>
        </div>
        <CardBody>
          {selectedChild !== null && selectedChild?.images.length > 0 ? (
            <CustomCarousel images={selectedChild.images} />
          ) : (
            <div></div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChildrenZone;
