import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Classnames from 'classnames';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import DescriptionIcon from '@material-ui/icons/Description';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles, Props } from './ReportItemIconStyle';

const ReportItemIcon: React.FC<Props> = (props) => {
  const { report, selectedReport, getSelectedItem } = props;
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const rootClasses = Classnames({
    [classes.root]: true,
    [classes.selected]: isSelected,
  });

  useEffect(() => {
    setIsSelected(report._id === selectedReport);
  }, [selectedReport]);

  const clickIconHandling = () => {
    getSelectedItem(report._id, report.report, report.title);
  };

  return (
    <Paper
      elevation={isSelected ? 3 : 20}
      className={rootClasses}
      onClick={clickIconHandling}
    >
      <GridContainer style={{ width: '100%' }}>
        <GridItem xs={12} sm={12} lg={12}>
          <div className={classes.content}>
            <DescriptionIcon className={classes.icon} />
            <Typography>{report.title}</Typography>
          </div>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default ReportItemIcon;
