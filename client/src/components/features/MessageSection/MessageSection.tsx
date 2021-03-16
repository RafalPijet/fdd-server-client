import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  PropsClasses,
  useStyles,
  StyleProps,
  Props,
} from './MessageSectionStyle';
import { Typography } from '@material-ui/core';
import { IOutsideMessage } from '../../../types/global';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import { addOutsideMessage } from '../../../redux/thunks';

const MessageSection: React.FC<Props> = (props) => {
  const { isDisabled, ...rest } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [message, setMessage] = useState<
    Omit<IOutsideMessage, '_id' | 'created' | 'new' | 'answer'>
  >({
    name: '',
    email: '',
    content: '',
  });
  const dispatch = useDispatch();

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
        <GridItem xs={12} sm={12} md={8}>
          <Typography variant="h4" className={classes.title}>
            Napisz do nas
          </Typography>
          <Typography className={classes.description}>
            Divide details about your product or agency work into parts. Write a
            few lines about each one and contact us about any further
            collaboration. We will responde get back to you in a couple of
            hours.
          </Typography>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  isDisabled={isDisabled}
                  onChange={handleTextField}
                  value={message.name}
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
                  disabled={isDisabled}
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
