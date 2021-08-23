import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Edit, Done } from '@material-ui/icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../SectionHeader/SectionHeader';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  IChildData,
  FddSwitch,
  different,
  EventChangeAvailableDestination,
} from '../../../types/global';
import {
  addChildToParent,
  updateChildDataRequest as updateChildData,
} from '../../../redux/thunks';
import {
  getPending,
  getSuccess,
  resetRequest,
} from '../../../redux/actions/requestActions';
import {
  getEventChange,
  setEventChange,
} from '../../../redux/actions/generalActions';
import { calculateAge } from '../../../types/functions';
import { useStyles, Props } from './ChildPersonalDataStyle';

const ChildPersonalData: React.FC<Props> = (props) => {
  const {
    childId,
    selectedChild,
    name,
    isOnlyEdit,
    infoText,
    helpText,
    userId,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const eventChange = useSelector(getEventChange);
  const eventData = eventChange.data as EventChangeAvailableDestination;
  const currentlyDifferent = Date.now() - different;
  let availableStartDate = new Date(currentlyDifferent).toLocaleDateString();
  availableStartDate = `${availableStartDate.substring(
    6,
    10
  )}-${availableStartDate.substring(3, 5)}-${availableStartDate.substring(
    0,
    2
  )}`;
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [childData, setChildData] = useState<IChildData>({
    firstName: '',
    lastName: '',
    birthDate: availableStartDate,
    info: '',
  });
  const [isError, setIsError] = useState<Record<keyof IChildData, boolean>>({
    firstName: false,
    lastName: false,
    birthDate: false,
    info: false,
  });
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn || isPending,
  });

  useEffect(() => {
    if (!isPending && isSuccess && userId !== undefined && !isOnlyEdit) {
      setChildData({
        firstName: '',
        lastName: '',
        birthDate: availableStartDate,
        info: '',
      });
      dispatch(resetRequest());
    }
  }, [isPending, isSuccess]);

  useEffect(() => {
    if (isOnlyEdit !== undefined) {
      setIsEdit(isOnlyEdit);
    }
  }, []);

  useEffect(() => {
    if (eventChange.isAction) {
      setSwitchIsOn(eventData.actionName === name);
      dispatch(setEventChange({ isAction: false, data: undefined }));
    }
  }, [eventChange.isAction]);

  useEffect(() => {
    if (selectedChild !== undefined && isEdit) {
      setChildData({
        firstName: selectedChild.firstName,
        lastName: selectedChild.lastName,
        birthDate: selectedChild.birthDate.toString().substring(0, 10),
        info: selectedChild.info,
      });
    }
    if (!isEdit || (isOnlyEdit && selectedChild === undefined)) {
      setChildData({
        firstName: '',
        lastName: '',
        birthDate: availableStartDate,
        info: '',
      });
    }
  }, [selectedChild, isEdit]);

  useEffect(() => {
    setIsError({
      ...isError,
      firstName:
        childData.firstName.length > 0 && childData.firstName.length < 3,
      lastName: childData.lastName.length > 0 && childData.lastName.length < 3,
      birthDate: calculateAge(childData.birthDate, false) >= 18,
      info: childData.info.length > 0 && childData.info.length < 20,
    });
  }, [childData]);

  useEffect(() => {
    if (switchIsOn) {
      if (isEdit && selectedChild !== undefined) {
        setIsReady(
          (childData.firstName !== selectedChild.firstName ||
            childData.lastName !== selectedChild.lastName ||
            childData.birthDate !==
              selectedChild.birthDate.toString().substring(0, 10) ||
            childData.info !== selectedChild.info) &&
            !isError.firstName &&
            !isError.lastName &&
            !isError.birthDate &&
            !isError.info &&
            !isPending
        );
      }
      if (!isEdit) {
        setIsReady(
          !isError.firstName &&
            childData.firstName.length > 0 &&
            !isError.lastName &&
            childData.lastName.length > 0 &&
            !isError.birthDate &&
            childData.birthDate.length > 0 &&
            !isError.info &&
            childData.info.length > 0 &&
            !isPending
        );
      }
    } else {
      setIsReady(false);
    }
  }, [isError, switchIsOn, isEdit, isPending, selectedChild]);

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChildData({ ...childData, [event.target.id!]: event.target.value });
  };

  const confirmButtonHandling = () => {
    if (childId) {
      isEdit
        ? dispatch(updateChildData(childData, childId))
        : dispatch(addChildToParent(childData));
    }
    if (childId === null && !isOnlyEdit) {
      dispatch(addChildToParent(childData, userId));
    }
  };

  const switchIsEditHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(e.target.checked);
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={false}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText={helpText}
        text={infoText}
      />
      <CardBody>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={4}>
            <CustomInput
              isDisabled={
                !switchIsOn || isPending || (childId === null && isOnlyEdit)
              }
              labelText="Imię dziecka..."
              id="firstName"
              error={isError.firstName}
              labelProps={
                switchIsOn || !isPending
                  ? { style: { color: '#fff' } }
                  : {
                      disabled:
                        !switchIsOn ||
                        isPending ||
                        (childId === null && isOnlyEdit),
                    }
              }
              value={childData.firstName}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.firstName && childData.firstName.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              isDisabled={
                !switchIsOn || isPending || (childId === null && isOnlyEdit)
              }
              labelText="Nazwisko dziecka"
              id="lastName"
              error={isError.lastName}
              labelProps={
                switchIsOn || !isPending
                  ? { style: { color: '#fff' } }
                  : {
                      disabled:
                        !switchIsOn ||
                        isPending ||
                        (childId === null && isOnlyEdit),
                    }
              }
              value={childData.lastName}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.lastName && childData.lastName.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              isDisabled={
                !switchIsOn || isPending || (childId === null && isOnlyEdit)
              }
              labelText="Data urodzenia..."
              id="birthDate"
              error={isError.birthDate}
              labelProps={
                switchIsOn || !isPending
                  ? { style: { color: '#fff' } }
                  : {
                      disabled:
                        !switchIsOn ||
                        isPending ||
                        (childId === null && isOnlyEdit),
                    }
              }
              value={childData.birthDate.toString()}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'date',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.birthDate &&
                    childData.birthDate.toString().length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} lg={8}>
            <CustomInput
              isDisabled={
                !switchIsOn || isPending || (childId === null && isOnlyEdit)
              }
              labelText="Opis..."
              id="info"
              error={isError.info}
              labelProps={
                switchIsOn || !isPending
                  ? { style: { color: '#fff' } }
                  : {
                      disabled:
                        !switchIsOn ||
                        isPending ||
                        (childId === null && isOnlyEdit),
                    }
              }
              value={childData.info}
              formControlProps={{
                fullWidth: true,
              }}
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                multiline: true,
                rows: 15,
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.info && childData.info.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.footer}>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CustomButton
              disabled={!isReady}
              progress={isPending}
              setSize="md"
              setColor="primary"
              onClick={confirmButtonHandling}
            >
              {isEdit ? 'Aktualizuj dane' : 'Dodaj podopiecznego'}
            </CustomButton>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              disabled={
                !switchIsOn ||
                isPending ||
                childId === null ||
                isOnlyEdit !== undefined
              }
              classes={{
                label: classes.switch,
              }}
              control={
                <FddSwitch checked={isEdit} onChange={switchIsEditHandling} />
              }
              label="EDYCJA"
            />
          </GridItem>
        </GridContainer>
      </CardFooter>
    </Card>
  );
};

export default ChildPersonalData;
