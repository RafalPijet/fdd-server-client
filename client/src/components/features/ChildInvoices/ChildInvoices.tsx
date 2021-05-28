import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import InvoiceItemIcon from '../../common/InvoiceItemIcon/InvoiceItemIcon';
import CustomPagination from '../../common/CustomPagination/CustomPagination';
import { urltoFile } from '../../../types/functions';
import { getCurrentlyInvoicesList } from '../../../redux/thunks';
import {
  getSelectedQuantity,
  getSelectedChild,
} from '../../../redux/actions/generalActions';
import { getUpdating } from '../../../redux/actions/requestActions';
import {
  PropsClasses,
  StyleProps,
  useStyles,
  Props,
} from './ChildInvoicesStyle';
import { InvoiceState } from '../../../types/global';

const ChildInvoices: React.FC<Props> = (props) => {
  const { invoices } = props;
  const dispatch = useDispatch();
  const quantity = useSelector(getSelectedQuantity);
  const childId = useSelector(getSelectedChild);
  const isUpdating = useSelector(getUpdating);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [invoiceFiles, setInvoiceFiles] = useState<[any, any]>([null, null]);
  const [invoiceDescription, setInvoiceDscription] = useState<string>('');
  const [chosenId, setChosenId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  const iconsClasses = ClassNames({
    [classes.icons]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn && !isUpdating,
    [classes.center]: invoices.length === 0,
  });

  const descriptionClasses = ClassNames({
    [classes.description]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  useEffect(() => {
    if (invoices.length) {
      chosenInvoiceHandling(invoices[0]);
      setChosenId(invoices[0]._id);
    }
  }, [invoices]);

  useEffect(() => {
    if (childId !== null)
      dispatch(getCurrentlyInvoicesList(childId, page, rowsPerPage));
  }, [page, rowsPerPage]);

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setFileType = (type: string) => {
    type = type.toLowerCase();
    if (type === 'pdf') {
      return 'application/pdf';
    } else if (type === 'jpg') {
      return 'image/jpg';
    } else if (type === 'jpeg') {
      return 'image/jpeg';
    } else if (type === 'png') {
      return 'image/png';
    }
  };

  const chosenInvoiceHandling = async (invoice: InvoiceState) => {
    setChosenId(invoice._id);
    setInvoiceDscription(invoice.description);
    let files: [any, any] = [...invoiceFiles];
    if (invoice.content.length > 0) {
      const fileType = invoice.content[0].substring(
        invoice.content[0].length - 3,
        invoice.content[0].length
      );
      const fileName = invoice.content[0].substring(
        invoice.content[0].lastIndexOf('/') + 1,
        invoice.content[0].length
      );
      await urltoFile(invoice.content[0], fileName, setFileType(fileType)).then(
        (file: File) => {
          files[0] = file;
        }
      );
      if (invoice.content.length === 1) {
        files[1] = null;
        setInvoiceFiles(files);
      }

      if (invoice.content.length > 1) {
        const secondfileType = invoice.content[1].substring(
          invoice.content[1].length - 3,
          invoice.content[1].length
        );
        const secondfileName = invoice.content[1].substring(
          invoice.content[1].lastIndexOf('/') + 1,
          invoice.content[1].length
        );
        await urltoFile(
          invoice.content[1],
          secondfileName,
          setFileType(secondfileType)
        ).then((file: File) => {
          files[1] = file;
        });
        setInvoiceFiles(files);
      }
    } else {
      if (invoiceFiles[0] !== null || invoiceFiles[1] !== null) {
        setInvoiceFiles([null, null]);
      }
    }
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={false}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="help text"
        text="Włącz/Wyłącz sekcję przeglądania faktur."
      />
      <CardBody>
        <GridContainer
          justify="center"
          alignItems="center"
          style={{
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <GridItem xs={12} sm={12} lg={6}>
            <Paper elevation={6} className={iconsClasses}>
              {invoices.length > 0 ? (
                invoices.map((invoice: InvoiceState) => {
                  return (
                    <InvoiceItemIcon
                      key={invoice._id}
                      isDisabled={!switchIsOn || isUpdating}
                      choisenId={chosenId}
                      invoice={invoice}
                      getChosenInvoice={chosenInvoiceHandling}
                    />
                  );
                })
              ) : (
                <Typography variant="h5" style={{ color: '#fff' }}>
                  Brak faktur dla podopiecznego
                </Typography>
              )}
            </Paper>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div style={{ width: 'fit-content' }}>
              <PreviewInvoiceItem
                isDisabled={!switchIsOn || isUpdating}
                number="0"
                file={invoiceFiles[0]}
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
                isDisabled={!switchIsOn || isUpdating}
                number="1"
                file={invoiceFiles[1]}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} lg={12}>
            <Paper elevation={6} className={descriptionClasses}>
              <Typography align="justify" className={classes.textColor}>
                {invoiceDescription}
              </Typography>
            </Paper>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className={classes.footer}>
        <CustomPagination
          rowsPerPageOptions={[8, 16, 24]}
          isHidden={!switchIsOn || !invoices.length || isUpdating}
          quantity={quantity !== null ? quantity : 0}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          label="Ilość faktur"
        />
      </CardFooter>
    </Card>
  );
};

export default ChildInvoices;
