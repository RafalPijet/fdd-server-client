import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Classnames from 'classnames';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import ReportItemIcon from '../ReportItemIcon/ReportItemIcon';
import {
  getAvailableReportsYears,
  getReportsOfSelectedYear,
  setReportsOfSelectedYear,
} from '../../../redux/actions/generalActions';
import {
  getPending,
  getUpdating,
  getAdding,
} from '../../../redux/actions/requestActions';
import {
  getReportsByYearRequest,
  getReportsYearsRequest,
} from '../../../redux/thunks';
import { a11yProps, setFileType, urltoFile } from '../../../types/functions';
import { ReportState } from '../../../types/global';
import { useStyles, Props } from './ReportsListStyle';

const ReportsList: React.FC<Props> = (props) => {
  const { isAdmin, getSelectedReport } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const isUpdating = useSelector(getUpdating);
  const isAdding = useSelector(getAdding);
  const availableReportsYears = useSelector(getAvailableReportsYears);
  const reportsOfSelectedYear = useSelector(getReportsOfSelectedYear);
  const [reportFile, setReportFile] = useState<any>(null);
  const [value, setValue] = useState<number>(0);
  const [selectedReportId, setSelectedReportId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const tabClasses = Classnames({
    [classes.tab]: true,
    [classes.pending]: isDisabled,
  });

  useEffect(() => {
    setIsDisabled(isPending || isUpdating || isAdding);
  }, [isPending, isUpdating, isAdding]);

  useEffect(() => {
    if (availableReportsYears.length) {
      dispatch(getReportsByYearRequest(availableReportsYears[value].year));
    }
  }, [availableReportsYears]);

  useEffect(() => {
    if (reportsOfSelectedYear !== null && reportsOfSelectedYear.length) {
      handleSelectedReport(
        reportsOfSelectedYear[0]._id,
        reportsOfSelectedYear[0].report,
        reportsOfSelectedYear[0].title
      );
      setIsVisible(true);
    }
    if (reportsOfSelectedYear !== null && !reportsOfSelectedYear.length) {
      dispatch(getReportsYearsRequest());
    }
  }, [reportsOfSelectedYear]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (!isDisabled) {
      setValue(newValue);
      setIsVisible(false);
    }
  };

  const handleSelectedReport = async (
    _id: string,
    url: string,
    title: string
  ) => {
    setSelectedReportId(_id);
    const fileType = url.substring(url.length - 3, url.length);
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    await urltoFile(url, fileName, setFileType(fileType)).then((file: File) => {
      setReportFile(file);
      if (getSelectedReport !== undefined) {
        getSelectedReport(_id, file, title);
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%', margin: '0 auto' }}
      >
        {isAdmin && (
          <GridItem xs={12} sm={12} lg={12}>
            <Typography variant="h6" align="center" className={classes.title}>
              W związku z obowiązkiem publikacji sprawozdania finansowego oraz
              merytorycznego przez Organizacje Pożytku Publicznego zapraszamy
              Państwa do zapoznania się ze sprawozdaniami naszej Fundacji.
            </Typography>
          </GridItem>
        )}
        <GridItem xs={12} sm={12} lg={8}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={12}
              lg={4}
              style={{
                paddingRight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Paper
                elevation={5}
                className={Classnames(classes.center, classes.box)}
              >
                {availableReportsYears.length ? (
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Years tabs"
                    className={classes.tabs}
                    classes={{ indicator: classes.indicator }}
                  >
                    {availableReportsYears.map((item, index) => {
                      let yearOfReport = +item.year;
                      yearOfReport = --yearOfReport;

                      return (
                        <Tab
                          key={index}
                          label={yearOfReport.toString()}
                          className={tabClasses}
                          {...a11yProps(index, 'year')}
                        />
                      );
                    })}
                  </Tabs>
                ) : (
                  <Typography>Czekaj...</Typography>
                )}
              </Paper>
            </GridItem>
            <GridItem xs={12} sm={12} lg={8}>
              <Fade
                in={isVisible}
                onExited={() => {
                  dispatch(setReportsOfSelectedYear(null));
                  dispatch(
                    getReportsByYearRequest(availableReportsYears[value].year)
                  );
                }}
              >
                <Paper variant="outlined" className={classes.list}>
                  {reportsOfSelectedYear !== null &&
                    reportsOfSelectedYear.map((item: ReportState) => {
                      return (
                        <ReportItemIcon
                          key={item._id}
                          report={item}
                          selectedReport={selectedReportId}
                          getSelectedItem={handleSelectedReport}
                        />
                      );
                    })}
                </Paper>
              </Fade>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={4}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Paper
            elevation={5}
            className={Classnames(classes.center, classes.box, classes.preview)}
          >
            <PreviewInvoiceItem
              isDisabled={isDisabled}
              number="0"
              file={reportFile}
            />
          </Paper>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default ReportsList;
