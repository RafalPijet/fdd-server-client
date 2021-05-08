import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  Props,
  getBase64,
} from './PreviewInvoiceItemStyle';
import logo from '../../../images/butterfly.png';

const PreviewInvoiceItem: React.FC<Props> = (props) => {
  const { file, getIsRemove, number } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [image, setImage] = useState<any>(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (
      file !== null &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg')
    ) {
      getBase64(file).then((image) => setImage(image));
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const removeItemHandling = () => {
    getIsRemove(true, number);
  };

  const showContent = () => {
    if (file === null) {
      return <img className={classes.logo} src={logo} alt="logo" />;
    } else {
      if (
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg') &&
        image !== null
      ) {
        return (
          <img className={classes.image} src={image} alt={`${file.name}`} />
        );
      } else if (file.type === 'application/pdf') {
        return (
          <Document
            file={file}
            className={classes.document}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              renderAnnotationLayer={false}
              pageNumber={pageNumber}
              width={150}
            />
          </Document>
        );
      }
    }
  };

  return (
    <Paper className={classes.root} elevation={6}>
      {showContent()}
      {file !== null && (
        <>
          <IconButton
            className={classes.zoomIcon}
            color="primary"
            component="span"
          >
            <ZoomOutMapIcon fontSize="large" />
          </IconButton>
          <IconButton
            className={classes.removeIcon}
            color="secondary"
            component="span"
            onClick={removeItemHandling}
          >
            <HighlightOffIcon fontSize="large" />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default PreviewInvoiceItem;
