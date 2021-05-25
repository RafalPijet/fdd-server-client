import React, { useState } from 'react';
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
  const { invoice } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isChosen, setIsChosen] = useState<boolean>(false);

  const clickIconHandling = () => {
    setIsChosen(!isChosen);
    console.log('Click');
  };

  return (
    <Paper
      elevation={isChosen ? 0 : 20}
      className={classes.root}
      onClick={clickIconHandling}
    >
      <DescriptionIcon className={classes.icon} />
      <Paper elevation={12} className={classes.main}>
        <Paper elevation={9} className={classes.dayBox}>
          <Typography className={classes.dayValue}>
            {invoice.addDate.toString().substring(8, 10)}
          </Typography>
        </Paper>
        <Paper elevation={0} className={classes.monthBox}>
          <Typography className={classes.monthValue}>
            {invoice.addDate.toString().substring(5, 7)}
          </Typography>
        </Paper>
        {isChosen && (
          <div
            style={{
              position: 'absolute',
              bottom: '-14px',
              left: '-17px',
              zIndex: 20,
            }}
          >
            <img src={logo} alt="logo" />
          </div>
        )}
        <Paper elevation={8} className={classes.yearBox}>
          <Typography className={classes.yearValue}>
            {invoice.addDate.toString().substring(0, 4)}
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  );
};

export default InvoiceItemIcon;
