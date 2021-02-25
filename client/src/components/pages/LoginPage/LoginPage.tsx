import React, { useState, useEffect } from 'react';
import {
  PropsClasses,
  useStyles,
  StyleProps,
  ServiceOptions,
  IUserLogin,
  IUserRegister,
} from './LoginPageStyle';
import InputAdornment from '@material-ui/core/InputAdornment';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Header from '../../common/Header/Header';
import HeaderLinks from '../../common/HeaderLinks/HeaderLinks';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  Email,
  Lock,
  ExitToApp,
  HowToReg,
  Edit,
  Done,
  LockOpen,
} from '@material-ui/icons';
import image from '../../../images/loginBackground.jpg';

const LoginPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [cardAnimation, setCardAnimation] = useState(true);
  const [register, setRegister] = useState<IUserRegister>({
    firstName: '',
    lastName: '',
    phone: '(+48)      ',
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
  setTimeout(() => {
    setCardAnimation(false);
  }, 700);

  useEffect(() => {
    setIsError({
      ...isError,
      firstName: register.firstName.length > 0 && register.firstName.length < 3,
      lastName: register.lastName.length > 0 && register.lastName.length < 3,
      phone: register.phone.length !== 11,
      email:
        (!register.email.includes('@') || !register.email.includes('.')) &&
        register.email.length !== 0,
      password:
        register.password.length > 0 &&
        register.confirmPassword.length > 0 &&
        register.password !== register.confirmPassword,
      confirmPassword:
        register.password.length > 0 &&
        register.confirmPassword.length > 0 &&
        register.password !== register.confirmPassword,
      zipCode:
        register.zipCode.length > 0 &&
        register.zipCode.replaceAll('_', '').replace('-', '').length !== 5,
      town: register.town.length > 0 && register.town.length < 3,
      street: register.town.length > 0 && register.town.length < 3,
    });
  }, [register]);

  const handleType = (
    event: React.ChangeEvent<{}>,
    newValue: ServiceOptions
  ) => {
    setServiceType(newValue);
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
      ? event.target.id === 'phone'
        ? setRegister({
            ...register,
            phone: event.target.value
              .replaceAll('_', '')
              .replaceAll('-', '')
              .replace('(', '')
              .replace(')', '')
              .replace('+', '')
              .replace(' ', ''),
          })
        : setRegister({ ...register, [event.target.id!]: event.target.value })
      : setLogin({ ...login, [event.target.id]: event.target.value });
  };
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Fundacja Dorośli Dzieciom"
        rightLinks={<HeaderLinks />}
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
              <Card className={cardAnimation ? classes.cardHidden : ''}>
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
                    <BottomNavigation
                      value={serviceType}
                      style={{ backgroundColor: 'transparent' }}
                      onChange={handleType}
                    >
                      <BottomNavigationAction
                        label="Logowanie"
                        value={ServiceOptions.login}
                        style={{ color: '#fff' }}
                        icon={<ExitToApp />}
                      />
                      <BottomNavigationAction
                        label="Rejestracja"
                        value={ServiceOptions.register}
                        style={{ color: '#fff' }}
                        icon={<HowToReg />}
                      />
                    </BottomNavigation>
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
                            mask
                            iconType={
                              !isError.phone && !register.phone.includes('+')
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
                                {!isError.email && register.email.length > 0 ? (
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
                          inputProps={{
                            type: 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                {!isError.password &&
                                register.password.length > 0 ? (
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
                        {serviceType === ServiceOptions.register && (
                          <CustomInput
                            labelText="Potwierdź hasło..."
                            id="confirmPassword"
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
                    <CustomButton simple setColor="primary" setSize="lg">
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
