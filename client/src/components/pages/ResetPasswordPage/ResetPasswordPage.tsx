import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { VariantType, useSnackbar } from 'notistack';
import { Redirect } from 'react-router';
import UIfx from 'uifx';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Lock, LockOpen } from '@material-ui/icons';
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
  getUpdatingError,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import { getToast, setUserToast } from '../../../redux/actions/generalActions';
import { changePasswordRequest } from '../../../redux/thunks';
import { IUserRegister } from '../LoginPage/LoginPageStyle';
import notificationSound from '../../../sounds/notification.wav';
import warningSound from '../../../sounds/warning.wav';
import { useStyles } from './ResetPasswordPageStyle';
import image from '../../../images/loginBackground.jpg';

const ResetPasswordPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isPending = useSelector(getUpdating);
  const isSuccess = useSelector(getUpdatingSuccess);
  const isRequestError = useSelector(getUpdatingError).isError;
  const requestError = useSelector(getUpdatingError).message;
  const toast = useSelector(getToast);
  const notification = new UIfx(notificationSound);
  const warning = new UIfx(warningSound);
  const [isCardAnimation, setIsCardAnimation] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);
  const [token, setToken] = useState<string>('');
  const [reset, setReset] = useState<
    Omit<
      IUserRegister,
      | 'firstName'
      | 'lastName'
      | 'phone'
      | 'zipCode'
      | 'town'
      | 'street'
      | 'number'
    >
  >({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isError, setIsError] = useState({
    password: false,
    confirmPassword: false,
  });

  setTimeout(() => {
    setIsCardAnimation(false);
  }, 700);

  useEffect(() => {
    const lastIndex = location.pathname.lastIndexOf('/');
    const rest = location.pathname.substring(0, lastIndex);
    setToken(
      location.pathname.substring(lastIndex + 1, location.pathname.length)
    );
    setReset({
      ...reset,
      email: rest.substring(rest.lastIndexOf('/') + 1, rest.length),
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setReset({
        ...reset,
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => setIsRedirect(true), 5000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (toast.isOpen) {
      handleToast(toast.content, toast.variant);
      dispatch(
        setUserToast({
          isOpen: false,
          content: '',
          variant: 'success',
        })
      );
    }
    if (isRequestError) {
      handleToast(requestError, 'error');
      dispatch(resetUpdatingRequest());
    }
  }, [isRequestError, toast.isOpen]);

  useEffect(() => {
    setIsError({
      ...isError,
      password: reset.password.length > 0 && reset.password.length < 5,
      confirmPassword:
        reset.confirmPassword.length > 0 &&
        reset.password !== reset.confirmPassword,
    });
  }, [reset.password, reset.confirmPassword]);

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReset({
      ...reset,
      [event.target.id]: event.target.value,
    });
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

  const handleSendButton = () => {
    dispatch(changePasswordRequest(reset.password, token));
  };

  const onKeyDown = (
    event: React.KeyboardEvent<
      HTMLButtonElement | HTMLTextAreaElement | HTMLInputElement
    >
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      if (!isError.password && !isError.confirmPassword) {
        handleSendButton();
      }
    }
  };

  if (isRedirect) {
    return <Redirect to="/login" />;
  }

  return (
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
            md={4}
            style={{
              transition: '.2s',
            }}
          >
            <Card className={isCardAnimation ? classes.cardHidden : ''}>
              <form className={classes.form}>
                <CardBody>
                  <Typography variant="h6" align="center">
                    Wprowadź nowe hasło
                  </Typography>
                  <Typography align="center">{reset.email}</Typography>
                  <CustomInput
                    labelText="Nowe hasło..."
                    id="password"
                    isDisabled={isPending}
                    value={reset.password}
                    error={isError.password}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={handleTextField}
                    inputProps={{
                      type: 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          {!isError.password && reset.password.length > 4 ? (
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
                    isDisabled={isPending}
                    value={reset.confirmPassword}
                    error={isError.confirmPassword}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleTextField}
                    inputProps={{
                      type: 'password',
                      endAdornment: (
                        <InputAdornment position="end">
                          <InputAdornment position="end">
                            {!isError.confirmPassword &&
                            reset.confirmPassword.length > 0 ? (
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
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <CustomButton
                    onClick={handleSendButton}
                    onKeyDown={onKeyDown}
                    progress={isPending}
                    disabled={
                      isError.password ||
                      isError.confirmPassword ||
                      !reset.password.length ||
                      !reset.confirmPassword.length ||
                      isPending
                    }
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
  );
};

export default ResetPasswordPage;
