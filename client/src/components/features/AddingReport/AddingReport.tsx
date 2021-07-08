import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IDropzoneProps } from 'react-dropzone-uploader';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomDropZone from '../../common/CustomDropZone/CustomDropZone';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import {
  getAdding,
  getAddingSuccess,
  resetAddingRequest,
} from '../../../redux/actions/requestActions';
import { addReportRequest } from '../../../redux/thunks';
import { FddSwitch } from '../../../types/global';
import { useStyles, Props } from './AddingReportStyle';

const AddingReport: React.FC<Props> = (props) => {
  const { reportToEdit } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const isAddingSuccess = useSelector(getAddingSuccess);
  const [reportId, setReportId] = useState<string>('');
  const [reportFile, setReportFile] = useState<any>(null);
  const [reportTitle, setReportTitle] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isError, setIsError] = useState({
    title: false,
    file: false,
  });

  useEffect(() => {
    if (reportToEdit !== null && isEdit) {
      setReportId(reportToEdit._id);
      setReportFile(reportToEdit.file);
      setReportTitle(reportToEdit.title);
    }
    if (!isEdit) {
      setReportId('');
      setReportFile(null);
      setReportTitle('');
    }
  }, [isEdit, reportToEdit]);

  useEffect(() => {
    if (isAddingSuccess) {
      dispatch(resetAddingRequest());
      setReportFile(null);
      setReportTitle('');
    }
  }, [isAddingSuccess]);

  useEffect(() => {
    setIsError({
      ...isError,
      title:
        (reportTitle.length > 0 && reportTitle.length < 5) ||
        reportTitle.length > 40,
      file: reportFile === null,
    });
  }, [reportTitle, reportFile]);

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(e.target.checked);
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file) {
      setReportFile(files[0].file);
      allFiles.forEach((f) => f.remove());
    }
  };

  const removeItemHandling = (number: string) => {
    if (number === '0') {
      setReportFile(null);
    }
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReportTitle(event.target.value);
  };

  const filesHandling = () => {
    dispatch(addReportRequest({ reportFile, reportTitle }));
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%', margin: '0 auto' }}
      >
        <GridItem xs={12} sm={12} lg={9}>
          <CustomDropZone
            handleSubmit={handleSubmit}
            isDisabled={reportFile !== null || isAdding}
            buttonLabel="DODAJ PLIK PDF"
            acceptFiles="application/pdf"
            dropFieldLabel="Upuść plik lub kliknij"
            dropFieldLabelReject="Tylko pliki pdf"
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={3}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <PreviewInvoiceItem
            isDisabled={isAdding}
            number="0"
            file={reportFile}
            getIsRemove={removeItemHandling}
          />
        </GridItem>
      </GridContainer>
      <GridContainer
        justify="center"
        alignItems="center"
        style={{ width: '100%', margin: '0 auto' }}
      >
        <GridItem
          xs={12}
          sm={12}
          lg={9}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CustomInput
            labelText="Tytuł sprawozdania..."
            id="reportTitle"
            isDisabled={isAdding}
            error={isError.title}
            value={reportTitle}
            formControlProps={{
              fullWidth: true,
            }}
            labelProps={{
              style: { color: `${isAdding ? '#fff' : 'inherit'}` },
              disabled: isAdding,
            }}
            onChange={handleTextField}
          />
          <FormControlLabel
            disabled={isAdding}
            classes={{
              label: classes.edit,
            }}
            control={
              <FddSwitch
                className={classes.switch}
                checked={isEdit}
                onChange={switchChangeHandling}
              />
            }
            label="EDIT"
          />
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          lg={3}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <CustomButton
            disabled={
              isError.file ||
              isError.title ||
              reportTitle.length === 0 ||
              isAdding
            }
            progress={isAdding}
            setSize="md"
            setColor="primary"
            onClick={filesHandling}
          >
            Dodaj sprawozdanie
          </CustomButton>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default AddingReport;
