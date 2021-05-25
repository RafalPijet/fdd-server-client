import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../../common/SectionHeader/SectionHeader';
import PreviewInvoiceItem from '../../common/PreviewInvoiceItem/PreviewInvoiceItem';
import InvoiceItemIcon from '../../common/InvoiceItemIcon/InvoiceItemIcon';
import { urltoFile } from '../../../types/functions';
import {
  PropsClasses,
  StyleProps,
  useStyles,
  Props,
} from './ChildInvoicesStyle';
import { InvoiceState } from '../../../types/global';

const ChildInvoices: React.FC<Props> = (props) => {
  const { invoices } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [invoiceFiles, setInvoiceFiles] = useState<[any, any]>([null, null]);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const test = async () => {
    await urltoFile(invoices[0].content[1], 'test.pdf', 'application/pdf').then(
      (file) => {
        // file.type = "application/pdf"
        console.log(file);
        // setFile(file);
      }
    );
  };

  const removeItemHandling = (number: string) => {};

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
          style={{ width: '100%', margin: '0 auto' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            {invoices.map((invoice: InvoiceState) => {
              return <InvoiceItemIcon key={invoice._id} invoice={invoice} />;
            })}
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <div style={{ width: 'fit-content' }}>
              <PreviewInvoiceItem
                isDisabled={!switchIsOn}
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
                isDisabled={!switchIsOn}
                number="1"
                file={invoiceFiles[1]}
                getIsRemove={removeItemHandling}
              />
            </div>
          </GridItem>
        </GridContainer>
      </CardBody>

      {/* <PreviewInvoiceItem
        isDisabled={false}
        number="0"
        file={file !== null ? file! : null}
        getIsRemove={removeItemHandling}
      />
      <button onClick={test}>Set</button> */}
    </Card>
  );
};

export default ChildInvoices;
