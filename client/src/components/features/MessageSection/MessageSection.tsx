import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles, Props } from './MessageSectionStyle';
import { Typography } from '@material-ui/core';
import { IOutsideMessage } from '../../../types/global';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  resetRequest,
  getError,
  getSuccess,
} from '../../../redux/actions/requestActions';
import { setUserToast, getToast } from '../../../redux/actions/generalActions';
import { addOutsideMessage } from '../../../redux/thunks';

const MessageSection: React.FC<Props> = (props) => {
  const { isDisabled, ...rest } = props;
  const [message, setMessage] = useState<
    Omit<IOutsideMessage, '_id' | 'created' | 'new' | 'answer'>
  >({
    name: '',
    email: '',
    content: '',
  });
  const [isErrorValidation, setIsErrorValidation] = useState<
    Record<
      keyof Omit<IOutsideMessage, '_id' | 'created' | 'new' | 'answer'>,
      boolean
    >
  >({
    name: false,
    email: false,
    content: false,
  });
  const [isSendAccess, setIsSendAccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isError = useSelector(getError).isError;
  const isToast = useSelector(getToast).isOpen;
  const isSuccess = useSelector(getSuccess);
  const classes = useStyles();

  useEffect(() => {
    setIsErrorValidation({
      ...isErrorValidation,
      name: message.name.length > 0 && message.name.length < 5,
      email:
        (!message.email.includes('@') || !message.email.includes('.')) &&
        message.email.length !== 0,
      content: message.content.length > 0 && message.content.length < 5,
    });
  }, [message]);

  useEffect(() => {
    setIsSendAccess(
      message.name.length > 0 &&
        message.email.length > 0 &&
        message.content.length > 0 &&
        !isErrorValidation.name &&
        !isErrorValidation.email &&
        !isErrorValidation.content
    );
  }, [message, isErrorValidation]);

  useEffect(() => {
    if (isSendAccess) {
      if (isError) dispatch(resetRequest());
      if (isToast)
        dispatch(
          setUserToast({
            isOpen: false,
            content: '',
            variant: 'success',
          })
        );
    }
    if (isSuccess) {
      setMessage({
        name: '',
        email: '',
        content: '',
      });
      setIsSendAccess(false);
      dispatch(resetRequest());
    }
  }, [isSendAccess, isSuccess]);

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage({ ...message, [event.target.id]: event.target.value });
  };

  const handleSendButton = () => {
    dispatch(addOutsideMessage(message));
  };

  return (
    <div {...rest} className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
          <Typography variant="h4" className={classes.title}>
            Napisz do nas
          </Typography>
          <Typography className={classes.description}>
            Jeśli macie Państwo pytania lub wątpliwości zapraszamy do kontaktu
            poprzez niniejszy formularz. Chętnie udzielimy konkretnych i
            wyczerpujących odpowiedzi.
          </Typography>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  isDisabled={isDisabled}
                  onChange={handleTextField}
                  value={message.name}
                  error={isErrorValidation.name}
                  labelText="imię i nazwisko"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  isDisabled={isDisabled}
                  onChange={handleTextField}
                  value={message.email}
                  error={isErrorValidation.email}
                  labelText="email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  isDisabled={isDisabled}
                  onChange={handleTextField}
                  value={message.content}
                  error={isErrorValidation.content}
                  labelText="wiadomość"
                  id="content"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                  }}
                />
              </GridItem>
              <GridItem container justify="center">
                <CustomButton
                  onClick={handleSendButton}
                  setColor="primary"
                  setSize="md"
                  disabled={!isSendAccess || isDisabled}
                >
                  Wyślij
                </CustomButton>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default MessageSection;
