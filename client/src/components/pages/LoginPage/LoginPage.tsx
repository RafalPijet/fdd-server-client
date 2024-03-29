import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { VariantType, useSnackbar } from 'notistack';
import UIfx from 'uifx';
import classNames from 'classnames';
import {
  getPending,
  getSuccess,
  getError,
  resetRequest,
  getUpdating,
  getUpdatingError,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import { getUserStatus } from '../../../redux/actions/userActions';
import {
  useStyles,
  IUserLogin,
  IUserRegister,
  Register,
} from './LoginPageStyle';
import { ServiceOptions } from '../../../types/global';
import { getToast, setUserToast } from '../../../redux/actions/generalActions';
import {
  loginUser,
  addUser,
  resetPasswordRequest,
} from '../../../redux/thunks';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../features/HeaderLinks/HeaderLinksLoginPage';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import CustomBottomNavigation from '../../common/CustomBottomNavigation/CustomBottomNavigation';
import { Email, Lock, Edit, Done, LockOpen } from '@material-ui/icons';
import image from '../../../images/loginBackground.jpg';
import notificationSound from '../../../sounds/notification.wav';
import warningSound from '../../../sounds/warning.wav';
import { UserStatus } from '../../../types/global';
import { naviLoginData } from '../../../data/entry';

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPendingRequest = useSelector(getPending);
  const isSuccessRequest = useSelector(getSuccess);
  const isErrorRequest = useSelector(getError).isError;
  const isUpdating = useSelector(getUpdating);
  const isUpdatingError = useSelector(getUpdatingError).isError;
  const updatingError = useSelector(getUpdatingError).message;
  const toast = useSelector(getToast);
  const errorMessage = useSelector(getError).message;
  const userStatus = useSelector(getUserStatus);
  const notification = new UIfx(notificationSound);
  const warning = new UIfx(warningSound);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isCardAnimation, setIsCardAnimation] = useState(true);
  const [register, setRegister] = useState<IUserRegister>({
    firstName: '',
    lastName: '',
    phone: '(+48)',
    email: '',
    password: '',
    confirmPassword: '',
    zipCode: '',
    town: '',
    street: '',
    number: '',
  });
  const [isError, setIsError] = useState<Record<keyof IUserRegister, boolean>>({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
    zipCode: false,
    town: false,
    street: false,
    number: false,
  });
  const [login, setLogin] = useState<IUserLogin>({
    email: '',
    password: '',
  });
  const [serviceType, setServiceType] = useState<ServiceOptions>(
    ServiceOptions.login
  );
  const [isAccess, setIsAccess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const resetClasses = classNames({
    [classes.resetSize]: true,
    [classes.reset]: login.email.length > 0 && !isError.email,
    [classes.resetPending]: isUpdating,
  });
  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

  const { enqueueSnackbar } = useSnackbar();

  const checkAccess = (
    errors: Record<keyof IUserRegister, boolean>,
    data: IUserRegister | IUserLogin
  ): boolean => {
    let counter: number = 0;
    Object.values(errors).forEach((item: boolean) => {
      if (item) counter++;
    });
    Object.values(data).forEach((item: string) => {
      if (!item.length) counter++;
    });
    return counter === 0;
  };

  useEffect(() => {
    if (serviceType === ServiceOptions.register) {
      setIsError({
        ...isError,
        firstName:
          register.firstName.length > 0 && register.firstName.length < 3,
        lastName: register.lastName.length > 0 && register.lastName.length < 3,
        phone:
          register.phone.length > 5 &&
          register.phone.replaceAll('_', '').length !== 17,
        email:
          (!register.email.includes('@') || !register.email.includes('.')) &&
          register.email.length !== 0,
        password: register.password.length > 0 && register.password.length < 5,
        confirmPassword:
          register.confirmPassword.length > 0 &&
          register.password !== register.confirmPassword,
        zipCode:
          register.zipCode.length > 0 &&
          register.zipCode.replace('_', '').length !== 6,
        town: register.town.length > 0 && register.town.length < 3,
        street: register.town.length > 0 && register.town.length < 3,
      });
    }
    if (serviceType === ServiceOptions.login) {
      setIsError({
        ...isError,
        email:
          (!login.email.includes('@') || !login.email.includes('.')) &&
          login.email.length !== 0,
        password: login.password.length > 0 && login.password.length < 5,
      });
    }
  }, [register, login]);

  useEffect(() => {
    if (serviceType === ServiceOptions.register) {
      setIsAccess(checkAccess(isError, register));
    }
    if (serviceType === ServiceOptions.login) {
      setIsAccess(checkAccess(isError, login));
    }
  }, [isError, register, login, serviceType]);

  useEffect(() => {
    setIsDisabled(isPendingRequest);
  }, [isPendingRequest]);

  useEffect(() => {
    setIsDisabled(isUpdating);
  }, [isUpdating]);

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
    }
    if (isUpdatingError) {
      handleToast(updatingError, 'error');
    }
    dispatch(resetUpdatingRequest());
    dispatch(setUserToast({ isOpen: false, content: '', variant: 'success' }));
  }, [isUpdatingError, toast.isOpen]);

  useEffect(() => {
    if (!isPendingRequest) {
      if (isSuccessRequest) {
        if (serviceType === ServiceOptions.register) {
          handleToast(
            `${register.firstName} ${register.lastName} jest zarejestrowanym rodzicem`,
            'success'
          );
          setLogin({
            email: register.email,
            password: register.password,
          });
          setServiceType(ServiceOptions.login);
        } else if (
          serviceType === ServiceOptions.login &&
          userStatus !== UserStatus.null
        ) {
          setTimeout(() => setIsRedirect(true), 10);
        }
      }
      if (isErrorRequest || isUpdatingError) {
        handleToast(errorMessage, 'error');
      }
      dispatch(resetRequest());
    }
  }, [isSuccessRequest, isErrorRequest, userStatus]);

  const handleType = (
    event: React.ChangeEvent<{}>,
    newValue: ServiceOptions
  ) => {
    setServiceType(newValue);
    if (newValue === ServiceOptions.login && register.email.length > 0) {
      setLogin({
        email: register.email,
        password: register.password,
      });
    }
  };
  //   const handleTextField = (
  //     fildName: keyof IUserRegister | keyof IUserLogin
  //   ) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setRegister({ ...register, [fildName]: event.target.value });
  //   };
  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    serviceType === ServiceOptions.register
      ? setRegister({ ...register, [event.target.id!]: event.target.value })
      : setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<
      HTMLButtonElement | HTMLTextAreaElement | HTMLInputElement
    >
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (isAccess && !isDisabled) {
        handleSendButton();
      }
    }
  };

  const handleSendButton = () => {
    if (serviceType === ServiceOptions.register) {
      const user = new Register(
        register.firstName,
        register.lastName,
        register.phone,
        register.email,
        register.password,
        register.zipCode,
        register.town,
        register.street,
        register.number
      );
      dispatch(addUser(user));
    } else {
      dispatch(loginUser(login));
    }
  };

  const handleToast = (message: string, variant: VariantType) => {
    if (variant === 'error') {
      warning.play(0.5);
    }
    if (variant === 'success') {
      notification.play(0.5);
    }
    enqueueSnackbar(message, { variant });
  };

  if (isRedirect) {
    if (userStatus === UserStatus.parent) {
      return <Redirect to="/parent" />;
    }
    if (userStatus === UserStatus.admin) {
      return <Redirect to="/admin" />;
    }
  }
  return (
    <div>
      <Header
        isSpiner={isDisabled}
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks isSpiner={isDisabled} />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={serviceType === ServiceOptions.login ? 4 : 12}
              style={{
                transition: '.2s',
              }}
            >
              <Card className={isCardAnimation ? classes.cardHidden : ''}>
                <div
                  style={{
                    minWidth: '330px',
                    margin: '0 auto',
                  }}
                >
                  <CardHeader
                    color="primaryCardHeader"
                    className={classes.cardHeader}
                  >
                    <CustomBottomNavigation
                      value={serviceType}
                      onChange={handleType}
                      disabled={isDisabled}
                      items={naviLoginData}
                    />
                  </CardHeader>
                </div>
                <form className={classes.form}>
                  <CardBody>
                    <GridContainer justify="center">
                      {serviceType === ServiceOptions.register && (
                        <GridItem
                          xs={12}
                          sm={12}
                          md={serviceType === ServiceOptions.register ? 4 : 12}
                        >
                          <CustomInput
                            labelText="Imię..."
                            id="firstName"
                            isDisabled={isDisabled}
                            value={register.firstName}
                            error={isError.firstName}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  {!isError.firstName &&
                                  register.firstName.length > 0 ? (
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
                            id="lastName"
                            isDisabled={isDisabled}
                            value={register.lastName}
                            error={isError.lastName}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  {!isError.lastName &&
                                  register.lastName.length > 0 ? (
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
                            isDisabled={isDisabled}
                            mask
                            iconType={
                              !isError.phone && register.phone.length > 5
                                ? 'done'
                                : 'phone'
                            }
                            formatMask="(+99) 999-999-999"
                            value={register.phone}
                            error={isError.phone}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'text',
                              autoComplete: 'off',
                            }}
                          />
                        </GridItem>
                      )}
                      <GridItem
                        xs={12}
                        sm={12}
                        md={serviceType === ServiceOptions.register ? 4 : 12}
                      >
                        <CustomInput
                          error={isError.email}
                          labelText="Adres email..."
                          id="email"
                          isDisabled={isDisabled}
                          autoFocus={serviceType === ServiceOptions.login}
                          value={
                            serviceType === ServiceOptions.register
                              ? register.email
                              : login.email
                          }
                          formControlProps={{
                            fullWidth: true,
                          }}
                          onChange={handleTextField}
                          inputProps={{
                            type: 'email',
                            endAdornment: (
                              <InputAdornment position="end">
                                {!isError.email &&
                                (serviceType === ServiceOptions.register
                                  ? register.email.length > 0
                                  : login.email.length > 0) ? (
                                  <Done className={classes.inputIconsColor} />
                                ) : (
                                  <Email className={classes.inputIconsColor} />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Hasło..."
                          id="password"
                          isDisabled={isDisabled}
                          value={
                            serviceType === ServiceOptions.register
                              ? register.password
                              : login.password
                          }
                          error={isError.password}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          onChange={handleTextField}
                          onKeyDown={onKeyDown}
                          inputProps={{
                            type: 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                {!isError.password &&
                                (serviceType === ServiceOptions.register
                                  ? register.password.length > 4
                                  : login.password.length > 4) ? (
                                  <LockOpen
                                    className={classes.inputIconsColor}
                                  />
                                ) : (
                                  <Lock className={classes.inputIconsColor} />
                                )}
                              </InputAdornment>
                            ),
                            autoComplete: 'off',
                          }}
                        />
                        {serviceType === ServiceOptions.login && (
                          <div className={classes.resetBox}>
                            <Button
                              color="default"
                              disabled={isError.email || !login.email.length}
                              className={resetClasses}
                              onClick={() =>
                                dispatch(resetPasswordRequest(login.email))
                              }
                            >
                              Nie pamiętam hasła
                            </Button>
                          </div>
                        )}
                        {serviceType === ServiceOptions.register && (
                          <CustomInput
                            labelText="Potwierdź hasło..."
                            id="confirmPassword"
                            isDisabled={isDisabled}
                            value={register.confirmPassword}
                            error={isError.confirmPassword}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'password',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <InputAdornment position="end">
                                    {!isError.confirmPassword &&
                                    register.confirmPassword.length > 0 ? (
                                      <LockOpen
                                        className={classes.inputIconsColor}
                                      />
                                    ) : (
                                      <Lock
                                        className={classes.inputIconsColor}
                                      />
                                    )}
                                  </InputAdornment>
                                </InputAdornment>
                              ),
                              autoComplete: 'off',
                            }}
                          />
                        )}
                      </GridItem>
                      {serviceType === ServiceOptions.register && (
                        <GridItem
                          xs={12}
                          sm={12}
                          md={serviceType === ServiceOptions.register ? 4 : 12}
                        >
                          <CustomInput
                            labelText="Kod pocztowy..."
                            mask
                            iconType={
                              !isError.zipCode &&
                              !register.zipCode.includes('_') &&
                              register.zipCode.length > 0
                                ? 'done'
                                : 'edit'
                            }
                            formatMask="99-999"
                            id="zipCode"
                            isDisabled={isDisabled}
                            value={register.zipCode}
                            error={isError.zipCode}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'text',
                            }}
                          />
                          <CustomInput
                            labelText="Miejscowość..."
                            id="town"
                            isDisabled={isDisabled}
                            value={register.town}
                            error={isError.town}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            onChange={handleTextField}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  {!isError.town && register.town.length > 0 ? (
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
                                value={register.street}
                                error={isError.street}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                onChange={handleTextField}
                                inputProps={{
                                  type: 'text',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {!isError.street &&
                                      register.street.length > 0 ? (
                                        <Done
                                          className={classes.inputIconsColor}
                                        />
                                      ) : (
                                        <Edit
                                          className={classes.inputIconsColor}
                                        />
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
                                value={register.number}
                                error={isError.number}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                onChange={handleTextField}
                                inputProps={{
                                  type: 'text',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      {register.number.length > 0 ? (
                                        <Done
                                          className={classes.inputIconsColor}
                                        />
                                      ) : (
                                        <Edit
                                          className={classes.inputIconsColor}
                                        />
                                      )}
                                    </InputAdornment>
                                  ),
                                  autoComplete: 'off',
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      )}
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <CustomButton
                      onClick={handleSendButton}
                      onKeyDown={onKeyDown}
                      progress={isDisabled}
                      disabled={!isAccess || isDisabled}
                      setColor="primary"
                      setSize="md"
                    >
                      Wyślij
                    </CustomButton>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
