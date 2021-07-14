import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CustomCarousel from '../../common/CustomCarousel/CustomCarousel';
import CardBody from '../../common/CardBody/CardBody';
import {
  getSelectedChild,
  getSelectedPerson,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import { getPending } from '../../../redux/actions/requestActions';
import { getUserChildren } from '../../../redux/actions/userActions';
import { updateChildStatusRequest } from '../../../redux/thunks';
import { ChildState, FddSwitch, ModalAYSModes } from '../../../types/global';
import { calculateAge } from '../../../types/functions';
import logo from '../../../images/butterfly.png';
import { useStyles, Props } from './ChildrenZoneStyle';

const ChildrenZone: React.FC<Props> = (props) => {
  const { childData, isAdmin } = props;
  const selectedPerson = useSelector(getSelectedPerson);
  const classes = useStyles();
  const dispatch = useDispatch();
  const childId = useSelector(getSelectedChild);
  const children = useSelector(getUserChildren);
  const isPending = useSelector(getPending);
  const [isCardAnimation, setIsCardAnimation] = useState<boolean>(true);
  const [selectedChild, setSelectedChild] = useState<ChildState | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  const deleteButtonClasses = classNames({
    [classes.icon]: isAdmin,
    [classes.disabled]: isPending,
  });
  const cardClasses = classNames({
    [classes.root]: true,
    [classes.cardHidden]: isCardAnimation,
  });
  const statusClasses = classNames({
    [classes.status]: true,
    [classes.active]: selectedChild !== null && selectedChild.active,
    [classes.inactive]: selectedChild !== null && !selectedChild.active,
    [classes.none]: selectedChild === null,
    [classes.disabled]: isPending,
  });

  const switchClasses = classNames({
    [classes.disabled]: isPending,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 900);

  useEffect(() => {
    prepareSelectedChild();
  }, [childId, selectedPerson]);

  useEffect(() => {
    if (selectedChild !== null) {
      setIsActive(selectedChild.active);
    }
  }, [selectedChild]);

  const prepareSelectedChild = () => {
    if (childId !== null) {
      const child = children.find((item: ChildState) => item._id === childId);
      child !== undefined ? setSelectedChild(child) : setSelectedChild(null);
    }
    if (childData !== undefined) {
      setSelectedChild(childData);
    }
  };

  const switchIsActivHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedChild !== null && isAdmin) {
      dispatch(updateChildStatusRequest(selectedChild._id, e.target.checked));
    }
  };

  const removeCurrentChildHandling = () => {
    if (selectedChild !== null && isAdmin) {
      dispatch(
        setModalAreYouSure({
          isOpen: true,
          title: 'Usuwanie podopiecznego',
          mode: ModalAYSModes.removeChild,
          description: `Uwaga!!! Potwierdzenie spowoduje bezpowrotne usunięcie wszystkich danych związanych z podopiecznym ${selectedChild.firstName} ${selectedChild.lastName}`,
          data: { childId: selectedChild._id },
        })
      );
    }
  };

  return (
    <div>
      <Card className={cardClasses}>
        <div className={classes.rowHeader}>
          {isAdmin && selectedChild !== null && (
            <>
              <span className={classes.remove}>
                <IconButton
                  onClick={removeCurrentChildHandling}
                  disabled={isPending}
                  className={classes.button}
                >
                  <DeleteForeverIcon className={deleteButtonClasses} />
                </IconButton>
              </span>
              <span className={classes.switch}>
                <FddSwitch
                  onChange={switchIsActivHandling}
                  checked={isActive}
                  disabled={isPending}
                  className={switchClasses}
                />
              </span>
            </>
          )}
          <span className={classes.statusRow}>
            status:
            <span className={statusClasses}>
              {selectedChild !== null
                ? selectedChild.active
                  ? 'PUBLIKACJA'
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
            <CustomCarousel images={selectedChild.images} isAutoPlay={true} />
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
