import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import { useSelector } from 'react-redux';
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
import { getUpdating } from '../../../redux/actions/requestActions';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import { FddSwitch } from '../../../types/global';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  Props,
} from './UserPersonalDataStyle';

const UserPersonalData: React.FC<Props> = (props) => {
  const { isAdmin, user } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const isUpdating = useSelector(getUpdating);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [userIsAdmin, setUsetIsAdmin] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    status: user.status,
    email: user.email,
    phone: user.phone,
    zipCode: user.adress.zipCode,
    town: user.adress.town,
    street: user.adress.street,
    number: user.adress.number,
    firstNameUser: user.firstName,
    lastNameUser: user.lastName,
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
  });
  const [isError, setIsError] = useState<Record<keyof any, boolean>>({
    status: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    adress: false,
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
    console.log('Confirm button');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (!isDisabled) {
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
        helpText="Help text"
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
              isDisabled={isDisabled || isUpdating}
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
              isDisabled={isDisabled || isUpdating}
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
              isDisabled={isDisabled || isUpdating}
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
              isDisabled={isDisabled || isUpdating}
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
              isDisabled={isDisabled}
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
              isDisabled={isDisabled}
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
              isDisabled={isDisabled}
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
              isDisabled={isDisabled}
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
              isDisabled={isDisabled}
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
                  isDisabled={isDisabled}
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
                  isDisabled={isDisabled}
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
      <CardFooter className="">
        <CustomButton
          onClick={handleSendButton}
          onKeyDown={onKeyDown}
          disabled={isDisabled}
          setColor="primary"
          setSize="md"
        >
          Aktualizuj dane
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default UserPersonalData;
