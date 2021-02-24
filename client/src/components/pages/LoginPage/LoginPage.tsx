import React, { useState } from 'react';
import {
  PropsClasses,
  useStyles,
  StyleProps,
  ServiceOptions,
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
  PhoneIphone,
  Edit,
} from '@material-ui/icons';
import image from '../../../images/loginBackground.jpg';

const LoginPage: React.FC = () => {
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [cardAnimation, setCardAnimation] = useState(true);
  const [serviceType, setServiceType] = useState<ServiceOptions>(
    ServiceOptions.login
  );
  setTimeout(() => {
    setCardAnimation(false);
  }, 700);
  const handleType = (
    event: React.ChangeEvent<{}>,
    newValue: ServiceOptions
  ) => {
    setServiceType(newValue);
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
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Edit className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <CustomInput
                            labelText="Nazwisko..."
                            id="lastName"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Edit className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                              autoComplete: 'off',
                            }}
                          />
                          <CustomInput
                            labelText="Telefon..."
                            id="phone"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PhoneIphone
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
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
                          labelText="Adres email..."
                          id="email"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'email',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Hasło..."
                          id="password"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Lock className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                            autoComplete: 'off',
                          }}
                        />
                        {serviceType === ServiceOptions.register && (
                          <CustomInput
                            labelText="Potwierdź hasło..."
                            id="confirmPassword"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'password',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Lock className={classes.inputIconsColor} />
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
                            id="zipCode"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Edit className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <CustomInput
                            labelText="Miejscowość..."
                            id="locality"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Edit className={classes.inputIconsColor} />
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
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: 'text',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Edit
                                        className={classes.inputIconsColor}
                                      />
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
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: 'text',
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Edit
                                        className={classes.inputIconsColor}
                                      />
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
