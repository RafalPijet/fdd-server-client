import React, { useState, useEffect } from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
  const { file, getIsRemove, number, isDisabled } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [image, setImage] = useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.5);
  const [imageScale, setImageScale] = useState<number>(1);

  const imageClasses = ClassNames({
    [classes.image]: true,
    [classes.disabled]: isDisabled,
  });

  const logoClasses = ClassNames({
    [classes.logo]: true,
    [classes.disabled]: isDisabled,
  });

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

  const handleClose = () => {
    setOpen(false);
    setScale(0.5);
    setImageScale(1);
  };

  const zoomPageHandling = (isZoomUp: boolean) => {
    if (isZoomUp) {
      if (file !== null && file.type === 'application/pdf') {
        if (scale >= 0.5 && scale < 1) {
          setScale(+scale.toFixed(1) + 0.1);
        }
      }
      if (file !== null && file.type !== 'application/pdf') {
        if (imageScale >= 1 && imageScale < 1.5) {
          setImageScale(+imageScale.toFixed(1) + 0.1);
        }
      }
    } else {
      if (file !== null && file.type === 'application/pdf') {
        if (scale > 0.5 && scale <= 1) {
          setScale(+scale.toFixed(1) - 0.1);
        }
      }
      if (file !== null && file.type !== 'application/pdf') {
        if (imageScale > 1 && imageScale <= 1.5) {
          setImageScale(+imageScale.toFixed(1) - 0.1);
        }
      }
    }
  };

  const changePageHandling = (isUp: boolean) => {
    if (isUp && numPages !== null) {
      if (pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    }
    if (!isUp && numPages !== null) {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const removeItemHandling = () => {
    getIsRemove(true, number);
    setImage(null);
  };

  const showContent = () => {
    if (file === null) {
      return <img className={logoClasses} src={logo} alt="logo" />;
    } else {
      if (
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg') &&
        image !== null
      ) {
        return (
          <img className={imageClasses} src={image} alt={`${file.name}`} />
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
            onClick={() => setOpen(true)}
            disabled={isDisabled}
          >
            <ZoomOutMapIcon fontSize="large" />
          </IconButton>
          <IconButton
            className={classes.removeIcon}
            color="secondary"
            component="span"
            onClick={removeItemHandling}
            disabled={isDisabled}
          >
            <HighlightOffIcon fontSize="large" />
          </IconButton>
        </>
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent>
          {image === null && file !== null ? (
            <Document
              file={file}
              className={classes.document}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                renderAnnotationLayer={true}
                renderInteractiveForms
                pageNumber={pageNumber}
                width={1200}
                scale={scale}
              />
            </Document>
          ) : (
            <img
              src={image}
              alt={`fdd-${number}`}
              style={{ transform: `scale(${imageScale})` }}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.dialogFooter}>
          {file !== null && file.type === 'application/pdf' ? (
            <div>
              <IconButton
                disabled={pageNumber <= 1}
                color="primary"
                component="span"
                onClick={() => changePageHandling(false)}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton
                disabled={numPages !== null && pageNumber >= numPages}
                color="primary"
                component="span"
                onClick={() => changePageHandling(true)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <span>
                {pageNumber} z {numPages}
              </span>
            </div>
          ) : (
            <div style={{ width: '100px' }}></div>
          )}
          <div>
            <IconButton
              color="primary"
              component="span"
              disabled={
                file?.type === 'application/pdf'
                  ? scale >= 1
                  : imageScale >= 1.5
              }
              onClick={() => zoomPageHandling(true)}
            >
              <ZoomInIcon fontSize="large" />
            </IconButton>
            <IconButton
              color="primary"
              component="span"
              disabled={
                file?.type === 'application/pdf'
                  ? scale <= 0.5
                  : imageScale <= 1
              }
              onClick={() => zoomPageHandling(false)}
            >
              <ZoomOutIcon fontSize="large" />
            </IconButton>
          </div>

          <IconButton color="primary" component="span" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PreviewInvoiceItem;
