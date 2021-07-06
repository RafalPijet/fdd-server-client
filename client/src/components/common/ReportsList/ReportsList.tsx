import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import { getAvailableReportsYears } from '../../../redux/actions/generalActions';
import { useStyles } from './ReportsListStyle';

const ReportsList: React.FC = () => {
  const classes = useStyles();
  const availableReportsYears = useSelector(getAvailableReportsYears);
  const [reportFile, setReportFile] = useState<any>(null);
  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%', margin: '0 auto' }}
      >
        <GridItem xs={12} sm={12} lg={9}>
          List
        </GridItem>
        <GridItem xs={12} sm={12} lg={3}>
          <PreviewInvoiceItem isDisabled={false} number="0" file={reportFile} />
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default ReportsList;
