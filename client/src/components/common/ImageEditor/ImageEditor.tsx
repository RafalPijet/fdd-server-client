import React, { useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import Paper from '@material-ui/core/Paper';
import { Props, StyleProps, useStyles, PropsClasses } from './ImageEditorStyle';
import 'cropperjs/dist/cropper.css';
import logo from '../../../images/butterfly.png';
import { ArrowsDirection } from '../../../types/global';

const ImageEditor: React.FC<Props> = (props) => {
  const {
    enteredImage,
    getPreview,
    isGetImage,
    isZoom,
    isRotate,
    isReset,
    isAvatar,
    arrow,
    isDisabled,
  } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [cropper, setCropper] = useState<any>();
  const [cropData, setCropData] = useState<any>(null);

  useEffect(() => {
    if (cropper) {
      isDisabled ? cropper.disable() : cropper.enable();
    }
  }, [isDisabled]);

  useEffect(() => {
    if (cropper && isZoom !== null) {
      isZoom ? cropper.zoom(0.1) : cropper.zoom(-0.1);
    }

    if (cropper && isRotate !== null) {
      isRotate ? cropper.rotate(10) : cropper.rotate(-10);
    }

    if (cropper && isReset) {
      cropper.reset();
    }

    if (cropper) {
      isAvatar
        ? cropper.setCropBoxData({ width: 120, height: 120 })
        : cropper.setCropBoxData({ width: 500, height: 332 });
    }

    if (cropper && arrow !== ArrowsDirection.null) {
      if (arrow === ArrowsDirection.up) {
        cropper.move(0, -5);
      } else if (arrow === ArrowsDirection.down) {
        cropper.move(0, 5);
      } else if (arrow === ArrowsDirection.left) {
        cropper.move(-5, 0);
      } else if (arrow === ArrowsDirection.right) {
        cropper.move(5, 0);
      }
    }
  }, [isZoom, isRotate, isReset, isAvatar, cropper, arrow]);

  useEffect(() => {
    if (isGetImage) {
      getCropData();
    }
  }, [isGetImage]);

  useEffect(() => {
    if (cropData !== null) {
      const result = cropper.getCropBoxData();
      if (!isAvatar && result.width !== 500 && result.height !== 332) {
        cropper.setCropBoxData({ width: 500, height: 332 });
        getPreview(cropData, false);
      } else if (isAvatar && result.width !== 120 && result.height !== 120) {
        cropper.setCropBoxData({ width: 120, height: 120 });
        getPreview(cropData, false);
      } else {
        getPreview(cropData, true);
      }
    }
  }, [cropData]);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      {enteredImage !== null && typeof enteredImage === 'string' ? (
        <Cropper
          style={{
            filter: `${isDisabled ? 'grayscale(100)' : 'grayscale(0)'}`,
          }}
          src={enteredImage}
          viewMode={1}
          zoomOnTouch={false}
          zoomOnWheel={false}
          cropBoxResizable={false}
          className={classes.crooper}
          initialAspectRatio={16 / 9}
          minCanvasWidth={550}
          guides={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      ) : (
        <img
          src={logo}
          alt="logo"
          style={{
            width: '400px',
            height: '361px',
            filter: `${isDisabled ? 'grayscale(100)' : 'grayscale(0)'}`,
          }}
        />
      )}
    </Paper>
  );
};

export default ImageEditor;
