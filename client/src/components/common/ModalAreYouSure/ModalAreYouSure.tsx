import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import SvgIcon from '@material-ui/core/SvgIcon';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CustomButton from '../CustomButton/CustomButton';
import { TransitionProps } from '@material-ui/core/transitions';
import { Props, useStyles } from './ModalAreYouSureStyle';
import { ReactComponent as sadSVG } from '../../../images/sad.svg';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalAreYouSure: React.FC<Props> = (props) => {
  const { isOpen, isConfirm, title, descriprion } = props;
  const classes = useStyles();

  return (
    <Dialog
      classes={{
        paper: classes.root,
      }}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => isConfirm(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <span className={classes.title}>
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <SvgIcon
          className={classes.icon}
          component={sadSVG}
          viewBox="0 0 600 476.6"
          fontSize="large"
        />
      </span>

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {descriprion}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          setColor="danger"
          setSize="md"
          onClick={() => isConfirm(true)}
        >
          Potwierdź
        </CustomButton>
        <CustomButton
          setColor="primary"
          setSize="md"
          onClick={() => isConfirm(false)}
        >
          Anuluj
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAreYouSure;
