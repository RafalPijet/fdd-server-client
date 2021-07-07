import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import {
  getAvailableReportsYears,
  getReportsOfSelectedYear,
} from '../../../redux/actions/generalActions';
import { getReportsByYearRequest } from '../../../redux/thunks';
import { a11yProps } from '../../../types/functions';
import { useStyles } from './ReportsListStyle';
import { ReportState } from '../../../types/global';

const ReportsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const availableReportsYears = useSelector(getAvailableReportsYears);
  const reportsOfSelectedYear = useSelector(getReportsOfSelectedYear);
  const [reportFile, setReportFile] = useState<any>(null);
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    dispatch(getReportsByYearRequest(availableReportsYears[newValue].year));
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%', margin: '0 auto' }}
      >
        <GridItem xs={12} sm={12} lg={9}>
          <div className={classes.main}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Years tabs"
              className={classes.tabs}
              classes={{ indicator: classes.indicator }}
            >
              {availableReportsYears.length &&
                availableReportsYears.map((item, index) => {
                  let yearOfReport = +item.year;
                  yearOfReport = --yearOfReport;

                  return (
                    <Tab
                      key={index}
                      label={yearOfReport.toString()}
                      className={classes.tab}
                      {...a11yProps(index, 'year')}
                    />
                  );
                })}
            </Tabs>
            <Paper variant="outlined" style={{ width: '100%', marginLeft: 20 }}>
              {reportsOfSelectedYear !== null ? (
                reportsOfSelectedYear.map((item: ReportState) => {
                  return <Typography key={item._id}>{item.title}</Typography>;
                })
              ) : (
                <Typography>Wczytywanie...</Typography>
              )}
            </Paper>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} lg={3}>
          <PreviewInvoiceItem isDisabled={false} number="0" file={reportFile} />
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default ReportsList;
