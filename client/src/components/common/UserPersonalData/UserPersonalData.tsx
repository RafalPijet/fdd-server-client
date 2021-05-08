import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Email, Lock, Edit, Done, LockOpen } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  getUpdating,
  getUpdatingSuccess,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { setModalAreYouSure } from '../../../redux/actions/generalActions';
import {
  FddSwitch,
  UserStatus,
  ModalAYSModes,
  UpdateUserTypeData,
} from '../../../types/global';
import { updateUser } from '../../../redux/thunks';
import { Register } from '../../pages/LoginPage/LoginPageStyle';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  Props,
  UserDataProps,
  emptyUserData,
} from './UserPersonalDataStyle';

const UserPersonalData: React.FC<Props> = (props) => {
  const { isAdmin, user } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const dispatch = useDispatch();
  const isUpdating = useSelector(getUpdating);
  const isSuccess = useSelector(getUpdatingSuccess);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(true);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(
    user.status === UserStatus.admin
  );
  const [userData, setUserData] = useState<UserDataProps>(emptyUserData);
  const [isError, setIsError] = useState<Record<keyof any, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    zipCode: false,
    town: false,
    street: false,
    number: false,
    newPassword: false,
    confirmPassword: false,
    oldPassword: false,
  });

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  useEffect(() => {
    if (isRefresh) {
      setUserData({
        email: user.email,
        phone: `(+${user.phone.substring(0, 2)}) ${user.phone.substring(
          2,
          5
        )}-${user.phone.substring(5, 8)}-${user.phone.substring(
          8,
          user.phone.length
        )}`,
        zipCode: `${user.adress.zipCode.substring(
          0,
          2
        )}-${user.adress.zipCode.substring(2, user.adress.zipCode.length)}`,
        town: user.adress.town,
        street: user.adress.street,
        number: user.adress.number,
        firstNameUser: user.firstName,
        lastNameUser: user.lastName,
        newPassword: '',
        confirmPassword: '',
        oldPassword: '',
      });
      setIsRefresh(false);
    }
  }, [isRefresh]);

  useEffect(() => {
    if (isSuccess && !checkIsDifferentData()) {
      setIsRefresh(true);
      dispatch(resetUpdatingRequest());
    }
  }, [user, isSuccess]);

  useEffect(() => {
    setIsError({
      ...isError,
      firstName:
        userData.firstNameUser.length > 0 && userData.firstNameUser.length < 3,
      lastName:
        userData.lastNameUser.length > 0 && userData.lastNameUser.length < 3,
      phone:
        userData.phone.length > 5 &&
        userData.phone.replaceAll('_', '').length !== 17,
      email:
        (!userData.email.includes('@') || !userData.email.includes('.')) &&
        userData.email.length !== 0,
      newPassword:
        userData.newPassword.length > 0 && userData.newPassword.length < 5,
      confirmPassword: userData.newPassword !== userData.confirmPassword,
      oldPassword:
        (userData.oldPassword.length > 0 && userData.oldPassword.length < 5) ||
        (userData.newPassword.length > 0 &&
          userData.confirmPassword.length > 0 &&
          userData.oldPassword.length === 0) ||
        (userData.newPassword.length === 0 &&
          userData.confirmPassword.length === 0 &&
          userData.oldPassword.length >= 5),
      zipCode:
        userData.zipCode.length > 0 &&
        userData.zipCode.replace('_', '').length !== 6,
      town: userData.town.length > 0 && userData.town.length < 3,
      street: userData.town.length > 0 && userData.town.length < 3,
      number: userData.number.length < 1,
    });
  }, [userData]);

  useEffect(() => {
    if (
      userData.newPassword.length > 0 &&
      userData.confirmPassword.length > 0 &&
      userData.oldPassword.length > 0
    ) {
      setIsDisabled(checkUserData(true));
    } else {
      setIsDisabled(checkUserData(false));
    }
  }, [isError, userData]);

  const checkIsDifferentData = (): boolean => {
    return (
      userData.firstNameUser !== user.firstName ||
      userData.lastNameUser !== user.lastName ||
      userData.phone !==
        `(+${user.phone.substring(0, 2)}) ${user.phone.substring(
          2,
          5
        )}-${user.phone.substring(5, 8)}-${user.phone.substring(
          8,
          user.phone.length
        )}` ||
      userData.email !== user.email ||
      userData.zipCode !==
        `${user.adress.zipCode.substring(0, 2)}-${user.adress.zipCode.substring(
          2,
          user.adress.zipCode.length
        )}` ||
      userData.town !== user.adress.town ||
      userData.street !== user.adress.street ||
      userData.number !== user.adress.number
    );
  };

  const checkUserData = (isPassword: boolean): boolean => {
    let checked: boolean;
    if (!isPassword) {
      checked = checkIsDifferentData();
    } else {
      checked = true;
    }
    return (
      checked &&
      !isError.firstName &&
      !isError.lastName &&
      !isError.phone &&
      !isError.email &&
      !isError.zipCode &&
      !isError.town &&
      !isError.street &&
      !isError.number &&
      !isError.newPassword &&
      !isError.confirmPassword &&
      !isError.oldPassword
    );
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({
      ...userData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSendButton = () => {
    let newData: any;
    if (checkIsDifferentData()) {
      newData = new Register(
        userData.firstNameUser,
        userData.lastNameUser,
        userData.phone,
        userData.email,
        'undefined',
        userData.zipCode,
        userData.town,
        userData.street,
        userData.number
      );
      newData.prepare();
      if (userData.newPassword.length > 0 && userData.oldPassword.length > 0) {
        newData = {
          ...newData,
          status: user.status,
          newPassword: userData.newPassword,
          oldPassword: userData.oldPassword,
        };
        dispatch(updateUser(newData, UpdateUserTypeData.all, user._id));
      } else {
        dispatch(updateUser(newData, UpdateUserTypeData.data, user._id));
      }
    } else {
      if (userData.newPassword.length > 0 && userData.oldPassword.length > 0) {
        newData = {
          newPassword: userData.newPassword,
          oldPassword: userData.oldPassword,
        };
        dispatch(updateUser(newData, UpdateUserTypeData.password, user._id));
      }
    }
  };

  const switchUserStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAdmin) {
      dispatch(
        setModalAreYouSure({
          mode: ModalAYSModes.changeUserStatus,
          isOpen: true,
          title: 'Chcesz zmienić status uzytkownika?',
          description: `Zmiana statusu uzytkownika ${user.firstName} ${
            user.lastName
          } z ${userIsAdmin ? 'ADMIN' : 'RODZIC'} na ${
            userIsAdmin ? 'RODZIC' : 'ADMIN'
          }. Jesteś pewien?`,
          data: {
            userId: user._id,
            userStatus: userIsAdmin ? UserStatus.parent : UserStatus.admin,
          },
        })
      );
    }
    setUserIsAdmin(e.target.checked); // to remove in Admin mode
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (isDisabled) {
        handleSendButton();
      }
    }
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={false}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="W tej sekcji można edytować dane użytkownika. Dokanaj zamirzonych zmian
        w odpowiednich polach, następnie kliknij przycisk AKTUALIZUJ DANE"
        text="Włącz/Wyłącz sekcję edycji danych uzytkownika."
      />
      <CardBody>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem xs={12} sm={12} lg={4}>
            <CustomInput
              labelText="Imię..."
              id="firstNameUser"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.firstNameUser}
              error={isError.firstName}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.firstName && userData.firstNameUser.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              labelText="Nazwisko..."
              id="lastNameUser"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.lastNameUser}
              error={isError.lastName}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.lastName && userData.lastNameUser.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
                autoComplete: 'off',
              }}
            />
            <CustomInput
              labelText="Telefon..."
              id="phone"
              isDisabled={!switchIsOn || isUpdating}
              mask
              iconType={
                !isError.phone && userData.phone.length > 5 ? 'done' : 'phone'
              }
              formatMask="(+99) 999-999-999"
              value={userData.phone}
              error={isError.phone}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} lg={4}>
            <CustomInput
              error={isError.email}
              labelText="Adres email..."
              id="email"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.email}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'email',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.email && userData.email.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Email className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              labelText="Nowe hasło..."
              id="newPassword"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.newPassword}
              error={isError.password}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.password && userData.newPassword.length ? (
                      <LockOpen className={classes.inputIconsColor} />
                    ) : (
                      <Lock className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
                autoComplete: 'off',
              }}
            />
            <CustomInput
              labelText="Potwierdź hasło..."
              id="confirmPassword"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.confirmPassword}
              error={isError.confirmPassword}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <InputAdornment position="end">
                      {!isError.confirmPassword &&
                      userData.confirmPassword.length > 0 ? (
                        <LockOpen className={classes.inputIconsColor} />
                      ) : (
                        <Lock className={classes.inputIconsColor} />
                      )}
                    </InputAdornment>
                  </InputAdornment>
                ),
                autoComplete: 'off',
              }}
            />
            <CustomInput
              labelText="Stare hasło..."
              id="oldPassword"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.oldPassword}
              error={isError.oldPassword}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <InputAdornment position="end">
                      {!isError.oldPassword &&
                      userData.oldPassword.length > 0 ? (
                        <LockOpen className={classes.inputIconsColor} />
                      ) : (
                        <Lock className={classes.inputIconsColor} />
                      )}
                    </InputAdornment>
                  </InputAdornment>
                ),
                autoComplete: 'off',
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} lg={4}>
            <CustomInput
              labelText="Kod pocztowy..."
              mask
              iconType={
                !isError.zipCode &&
                !userData.zipCode.includes('_') &&
                userData.zipCode.length > 0
                  ? 'done'
                  : 'edit'
              }
              formatMask="99-999"
              id="zipCode"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.zipCode}
              error={isError.zipCode}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'text',
              }}
            />
            <CustomInput
              labelText="Miejscowość..."
              id="town"
              isDisabled={!switchIsOn || isUpdating}
              value={userData.town}
              error={isError.town}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={
                switchIsOn || !isUpdating
                  ? { style: { color: '#fff' } }
                  : { disabled: !switchIsOn || isUpdating }
              }
              onChange={handleTextField}
              inputProps={{
                type: 'text',
                endAdornment: (
                  <InputAdornment position="end">
                    {!isError.town && userData.town.length > 0 ? (
                      <Done className={classes.inputIconsColor} />
                    ) : (
                      <Edit className={classes.inputIconsColor} />
                    )}
                  </InputAdornment>
                ),
                autoComplete: 'off',
              }}
            />
            <GridContainer justify="space-between">
              <GridItem xs={12} sm={12} lg={8}>
                <CustomInput
                  labelText="Ulica..."
                  id="street"
                  isDisabled={!switchIsOn || isUpdating}
                  value={userData.street}
                  error={isError.street}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  labelProps={
                    switchIsOn || !isUpdating
                      ? { style: { color: '#fff' } }
                      : { disabled: !switchIsOn || isUpdating }
                  }
                  onChange={handleTextField}
                  inputProps={{
                    type: 'text',
                    endAdornment: (
                      <InputAdornment position="end">
                        {!isError.street && userData.street.length > 0 ? (
                          <Done className={classes.inputIconsColor} />
                        ) : (
                          <Edit className={classes.inputIconsColor} />
                        )}
                      </InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} lg={4}>
                <CustomInput
                  labelText="Numer..."
                  id="number"
                  isDisabled={!switchIsOn || isUpdating}
                  value={userData.number}
                  error={isError.number}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  labelProps={
                    switchIsOn || !isUpdating
                      ? { style: { color: '#fff' } }
                      : { disabled: !switchIsOn || isUpdating }
                  }
                  onChange={handleTextField}
                  inputProps={{
                    type: 'text',
                    endAdornment: (
                      <InputAdornment position="end">
                        {userData.number.length > 0 ? (
                          <Done className={classes.inputIconsColor} />
                        ) : (
                          <Edit className={classes.inputIconsColor} />
                        )}
                      </InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
      <GridContainer justify="center">
        <CardFooter className={classes.footer}>
          <CustomButton
            onClick={handleSendButton}
            onKeyDown={onKeyDown}
            disabled={!switchIsOn || !isDisabled || isUpdating}
            setColor="primary"
            setSize="md"
          >
            Aktualizuj dane
          </CustomButton>
          {isAdmin && (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className={classes.parent}>RODZIC</span>
              <FormControlLabel
                disabled={!switchIsOn || isUpdating}
                classes={{
                  label: classes.switch,
                }}
                control={
                  <FddSwitch
                    checked={userIsAdmin}
                    onChange={switchUserStatus}
                  />
                }
                label="ADMIN"
              />
            </span>
          )}
        </CardFooter>
      </GridContainer>
    </Card>
  );
};

export default UserPersonalData;
