import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import Paper from '@material-ui/core/Paper';
import { Props, useStyles } from './CustomDropZoneStyle';
import { primaryColor } from '../../../styles/globalStyles';

const CustomDropZone: React.FC<Props> = (props) => {
  const {
    handleSubmit,
    isDisabled,
    buttonLabel,
    dropFieldLabel,
    dropFieldLabelReject,
    acceptFiles,
  } = props;
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Dropzone
        submitButtonContent={buttonLabel}
        disabled={isDisabled}
        onSubmit={handleSubmit}
        accept={acceptFiles}
        maxFiles={1}
        inputContent={(files, extra) =>
          extra.reject ? dropFieldLabelReject : dropFieldLabel
        }
        styles={{
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) =>
            extra.reject ? { color: 'red' } : { color: primaryColor },
          submitButtonContainer: {
            margin: '10px 0',
          },
          submitButton: {
            backgroundColor: primaryColor,
            padding: '14px',
            fontFamily: 'Roboto',
          },
          preview: { padding: '10px 3%' },
          previewImage: { maxWidth: '200px', maxHeight: '120px' },
          dropzone: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            margin: '10px',
            borderColor: primaryColor,
          },
        }}
      />
    </Paper>
  );
};

export default CustomDropZone;
