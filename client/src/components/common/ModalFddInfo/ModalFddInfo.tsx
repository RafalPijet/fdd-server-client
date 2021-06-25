import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomButton from '../CustomButton/CustomButton';
import { TransitionProps } from '@material-ui/core/transitions';
import { useStyles, Props } from './ModalFddInfoStyle';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalFddInfo: React.FC<Props> = (props) => {
  const { isOpen, closeModal } = props;
  const classes = useStyles();
  return (
    <Dialog
      classes={{
        paper: classes.root,
      }}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        O fundacji Dorośli Dzieciom
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Informacje opis
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton setColor="primary" setSize="md" onClick={closeModal}>
          Zamknij
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFddInfo;
