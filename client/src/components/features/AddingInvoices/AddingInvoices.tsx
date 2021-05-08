import React, { useState } from 'react';
import ClassNames from 'classnames';
import { IDropzoneProps } from 'react-dropzone-uploader';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
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
  PropsClasses,
  useStyles,
  StyleProps,
  Props,
} from './AddingInvoicesStyle';

const AddingInvoices: React.FC<Props> = (props) => {
  const { childId, selectedChild } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [invoiceScans, setInvoiceScans] = useState<[any, any]>([null, null]);
  const [invoiceFiles, setInvoiceFiles] = useState<[any, any]>([null, null]);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const removeItemHandling = (isRemove: boolean, number: string) => {
    const filesState = [...invoiceFiles];
    filesState[+number] = null;
    setInvoiceFiles([filesState[0], filesState[1]]);
  };

  const test = () => {
    setInvoiceFiles([null, null]);
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
        console.log('2 x null');
      } else {
        if (invoiceFiles[0] !== null) {
          console.log('0 = null');
          setInvoiceFiles([invoiceFiles[0], files[0].file]);
        }
        if (invoiceFiles[1] !== null) {
          console.log('1 = null');
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
              isDisabled={invoiceFiles[0] !== null && invoiceFiles[1] !== null}
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
              isDisabled={isDisabled}
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
          disabled={isDisabled}
          setSize="md"
          setColor="primary"
          onClick={test}
        >
          Wyślij falturę
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default AddingInvoices;
