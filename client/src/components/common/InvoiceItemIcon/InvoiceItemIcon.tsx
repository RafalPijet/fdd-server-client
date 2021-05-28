import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import {
  Props,
  StyleProps,
  PropsClasses,
  useStyles,
} from './InvoiceItemIconStyle';
import logo from '../../../images/butterflyMini.png';

const InvoiceItemIcon: React.FC<Props> = (props) => {
  const { invoice, choisenId, getChosenInvoice, isDisabled } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isChosen, setIsChosen] = useState<boolean>(false);

  const iconClasses = ClassNames({
    [classes.icon]: true,
    [classes.chosen]: isChosen,
  });

  useEffect(() => {
    setIsChosen(choisenId === invoice._id);
  }, [choisenId]);

  const clickIconHandling = () => {
    if (!isDisabled) getChosenInvoice(invoice);
  };

  return (
    <Paper
      elevation={isChosen ? 0 : 20}
      className={classes.root}
      onClick={clickIconHandling}
    >
      <DescriptionIcon className={iconClasses} />
      <Paper elevation={12} className={classes.main}>
        <Paper elevation={9} className={classes.dayBox}>
          <Typography className={classes.dayValue}>
            {invoice.createdAt.toString().substring(8, 10)}
          </Typography>
        </Paper>
        <Paper elevation={0} className={classes.monthBox}>
          <Typography className={classes.monthValue}>
            {invoice.createdAt.toString().substring(5, 7)}
          </Typography>
        </Paper>
        {isChosen && (
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
          </div>
        )}
        <Paper elevation={8} className={classes.yearBox}>
          <Typography className={classes.yearValue}>
            {invoice.createdAt.toString().substring(0, 4)}
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  );
};

export default InvoiceItemIcon;
