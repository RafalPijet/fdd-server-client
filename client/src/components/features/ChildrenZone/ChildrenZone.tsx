import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import CardBody from '../../common/CardBody/CardBody';
import {
  getSelectedChild,
  getSelectedPerson,
} from '../../../redux/actions/generalActions';
import { getUserChildren } from '../../../redux/actions/userActions';
import {
  useStyles,
  StyleProps,
  PropsClasses,
  Props,
} from './ChildrenZoneStyle';
import { ChildState } from '../../../types/global';
import { calculateAge } from '../../../types/functions';
import logo from '../../../images/butterfly.png';

const ChildrenZone: React.FC<Props> = (props) => {
  const { childData } = props;
  const selectedPerson = useSelector(getSelectedPerson);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [selectedChild, setSelectedChild] = useState<ChildState | null>(null);
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  const statusClasses = classNames({
    [classes.status]: true,
    [classes.active]: selectedChild !== null && selectedChild.active,
    [classes.inactive]: selectedChild !== null && !selectedChild.active,
    [classes.none]: selectedChild === null,
  });
  const childId = useSelector(getSelectedChild);
  const children = useSelector(getUserChildren);
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    prepareSelectedChild();
  }, [childId, selectedPerson]);

  const prepareSelectedChild = () => {
    if (childId !== null) {
      const child = children.find((item: ChildState) => item._id === childId);
      child !== undefined ? setSelectedChild(child) : setSelectedChild(null);
    }
    if (childData !== undefined) {
      setSelectedChild(childData);
    }
  };

  return (
    <div>
      <Card className={cardClasses}>
        <div className={classes.rowHeader}>
          <span className={classes.statusRow}>
            status:
            <span className={statusClasses}>
              {selectedChild !== null
                ? selectedChild.active
                  ? 'AKTYWNY'
                  : 'NIEAKTYWNY'
                : 'BRAK'}
            </span>
          </span>
          <CardHeader className={classes.cardHeader} color="infoCardHeader">
            <span
              style={{ maxHeight: '18px', overflow: 'auto', padding: '0 2px' }}
            >
              {selectedChild?.firstName} {selectedChild?.lastName}
            </span>
            <Avatar
              variant="rounded"
              src={selectedChild?.avatar}
              alt={`${selectedChild?.firstName} ${selectedChild?.lastName}`}
              className={classes.large}
            />
            <span>
              {selectedChild !== null
                ? calculateAge(selectedChild.birthDate, true)
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
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: '340px', height: '310px' }}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ChildrenZone;
