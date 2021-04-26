import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import Paper from '@material-ui/core/Paper';
import { Props, StyleProps, useStyles, PropsClasses } from './ImageEditorStyle';
import 'cropperjs/dist/cropper.css';
import logo from '../../../images/butterfly.png';

const ImageEditor: React.FC<Props> = (props) => {
  const { enteredImage, getPreview } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL());
    // getPreview(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Cropper
        src={
          enteredImage !== null && typeof enteredImage === 'string'
            ? enteredImage
            : logo
        }
        className={classes.crooper}
        preview=".img-preview"
        // style={{ height: 400, width: '100%' }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
    </Paper>
  );
};

export default ImageEditor;
