import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import { Lock, LockOpen } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { getUserEmail } from '../../../redux/actions/userActions';
import { Props, useStyles } from './ModalLoginStyle';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalLogin: React.FC<Props> = (props) => {
  const { isOpen, isConfirm } = props;
  const classes = useStyles();
  const userEmail = useSelector(getUserEmail);
  const [password, setPassword] = useState<string>('');

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<
      HTMLButtonElement | HTMLTextAreaElement | HTMLInputElement
    >
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      console.log('Enter confirm');
    }
  };

  return (
    <Dialog
      classes={{
        paper: classes.root,
      }}
      open={isOpen}
      disableBackdropClick
      disableEscapeKeyDown
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-email"
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.textCenter}>
        Zaloguj się ponownie
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-email">
          {userEmail}
        </DialogContentText>
        <CustomInput
          labelText="Hasło..."
          id="password"
          isDisabled={false}
          value={password}
          //   error={isError.password}
          formControlProps={{
            fullWidth: true,
            focused: true,
          }}
          onChange={handleTextField}
          onKeyDown={onKeyDown}
          inputProps={{
            type: 'password',
            endAdornment: (
              <InputAdornment position="end">
                {password.length > 4 ? (
                  <LockOpen className={classes.inputIconsColor} />
                ) : (
                  <Lock className={classes.inputIconsColor} />
                )}
              </InputAdornment>
            ),
            autoComplete: 'off',
          }}
        />
      </DialogContent>
      <DialogActions className={classes.footer}>
        <CustomButton
          setColor="primary"
          setSize="md"
          onClick={() => isConfirm(false)}
        >
          Wyjdź
        </CustomButton>
        <CustomButton
          setColor="primary"
          setSize="md"
          disabled={password.length < 5}
          onClick={() => isConfirm(true)}
        >
          Potwierdź
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalLogin;
