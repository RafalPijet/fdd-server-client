import React from 'react';
import { useDispatch } from 'react-redux';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import Card from '../../common/Card/Card';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import { addImageToChild } from '../../../redux/thunks';
import { StyleProps, PropsClasses, useStyles } from './AddingImageStyle';
import 'react-dropzone-uploader/dist/styles.css';

interface Props {
  childId: string | null;
}

const AddingImage: React.FC<Props> = (props) => {
  const { childId } = props;
  const dispatch = useDispatch();
  const classes: PropsClasses = useStyles({} as StyleProps);

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file && childId !== null) {
      dispatch(addImageToChild(files[0].file, childId));
    }
    allFiles.forEach((f) => f.remove());
  };
  return (
    <Card className={classes.root}>
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <CardHeader color="primaryCardHeader" className="">
          <p>Header Content</p>
        </CardHeader>
      </div>
      <CardBody>
        <Dropzone
          onSubmit={handleSubmit}
          accept=".jpg,.jpeg,.png"
          maxFiles={1}
          inputContent={(files, extra) =>
            extra.reject
              ? 'Tylko plik ze zdjęciem'
              : 'Upuść zdjęcie lub kliknij'
          }
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) =>
              extra.reject ? { color: 'red' } : {},
          }}
        />
      </CardBody>
      <CardFooter className="">
        <p>Footer Content</p>
      </CardFooter>
      <div
        style={{
          margin: '0 auto',
        }}
      ></div>
    </Card>
  );
};

export default AddingImage;
