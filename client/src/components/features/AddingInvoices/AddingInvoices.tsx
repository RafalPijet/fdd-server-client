import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ClassNames from 'classnames';
import { IDropzoneProps } from 'react-dropzone-uploader';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import CardFooter from '../../common/CardFooter/CardFooter';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import CustomDropZone from '../../common/CustomDropZone/CustomDropZone';
import {
  getAdding,
  getAddingSuccess,
  resetAddingRequest,
} from '../../../redux/actions/requestActions';
import { addInvoiceToChild } from '../../../redux/thunks';
import {
  PropsClasses,
  useStyles,
  StyleProps,
  Props,
} from './AddingInvoicesStyle';

const AddingInvoices: React.FC<Props> = (props) => {
  const { childId, selectedChild } = props;
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const isSuccess = useSelector(getAddingSuccess);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [invoiceFiles, setInvoiceFiles] = useState<[any, any]>([null, null]);
  const [description, setDescription] = useState<string>('');
  const [isError, setIsError] = useState({
    description: false,
    images: false,
  });

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  useEffect(() => {
    if (switchIsOn && isSuccess) {
      dispatch(resetAddingRequest());
      setInvoiceFiles([null, null]);
      setDescription('');
    }
  }, [isSuccess, switchIsOn]);

  useEffect(() => {
    setIsError({
      ...isError,
      description: description.length > 0 && description.length < 20,
      images: invoiceFiles[0] === null && invoiceFiles[1] === null,
    });
  }, [description, invoiceFiles]);

  useEffect(() => {
    setIsDisabled(
      isError.description || isError.images || !description.length || isAdding
    );
  }, [isError.description, isError.images, description, isAdding]);

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const removeItemHandling = (isRemove: boolean, number: string) => {
    const filesState = [...invoiceFiles];
    filesState[+number] = null;
    setInvoiceFiles([filesState[0], filesState[1]]);
  };

  const filesHandling = () => {
    if (childId !== null) {
      dispatch(
        addInvoiceToChild(
          {
            files: invoiceFiles,
            description,
          },
          childId
        )
      );
    }
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file && childId !== null) {
      if (invoiceFiles[0] === null && invoiceFiles[1] === null) {
        setInvoiceFiles([files[0].file, null]);
      } else {
        if (invoiceFiles[0] !== null) {
          setInvoiceFiles([invoiceFiles[0], files[0].file]);
        }
        if (invoiceFiles[1] !== null) {
          setInvoiceFiles([files[0].file, invoiceFiles[1]]);
        }
      }
    }
    allFiles.forEach((f) => f.remove());
  };
  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={false}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="help text"
        text="Włącz/Wyłącz sekcję przesyłania skanów faktur."
      />
      <CardBody>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CustomDropZone
              handleSubmit={handleSubmit}
              isDisabled={
                (invoiceFiles[0] !== null && invoiceFiles[1] !== null) ||
                isAdding ||
                !switchIsOn
              }
              buttonLabel="DODAJ SKAN"
              acceptFiles="application/pdf, image/jpg, image/jpeg, image/png"
              dropFieldLabel="Upuść plik lub kliknij"
              dropFieldLabelReject="Tylko skan typu (pdf, jpg, jpeg, png)"
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div style={{ width: 'fit-content' }}>
              <PreviewInvoiceItem
                isDisabled={!switchIsOn || isAdding}
                number="0"
                file={invoiceFiles[0]}
                getIsRemove={removeItemHandling}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: 'fit-content',
                alignItems: 'center',
              }}
            >
              <PreviewInvoiceItem
                isDisabled={!switchIsOn || isAdding}
                number="1"
                file={invoiceFiles[1]}
                getIsRemove={removeItemHandling}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} lg={8}>
            <CustomInput
              labelText="Opis..."
              id="description"
              isDisabled={!switchIsOn || isAdding}
              error={isError.description}
              value={description}
              formControlProps={{
                fullWidth: true,
              }}
              labelProps={{
                style: { color: `${switchIsOn ? '#fff' : 'inherit'}` },
                disabled: !switchIsOn,
              }}
              onChange={handleTextField}
              inputProps={{
                multiline: true,
                autoFocus: true,
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.footer}>
        <CustomButton
          disabled={isDisabled || !switchIsOn}
          setSize="md"
          setColor="primary"
          onClick={filesHandling}
        >
          Wyślij fakturę
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default AddingInvoices;
