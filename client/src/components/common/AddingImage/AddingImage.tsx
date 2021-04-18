import React from 'react';
import { useDispatch } from 'react-redux';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import { addImageToChild } from '../../../redux/thunks';
import 'react-dropzone-uploader/dist/styles.css';

interface Props {
  childId: string | null;
}

const AddingImage: React.FC<Props> = (props) => {
  const { childId } = props;
  const dispatch = useDispatch();

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file && childId !== null) {
      dispatch(addImageToChild(files[0].file, childId));
    }
    allFiles.forEach((f) => f.remove());
  };
  return (
    <Dropzone
      onSubmit={handleSubmit}
      accept=".jpg,.jpeg,.png"
      maxFiles={1}
      inputContent={(files, extra) =>
        extra.reject ? 'Tylko plik ze zdjęciem' : 'Upuść zdjęcie lub kliknij'
      }
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  );
};

export default AddingImage;
