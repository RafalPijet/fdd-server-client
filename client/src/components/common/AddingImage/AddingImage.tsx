import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IDropzoneProps } from 'react-dropzone-uploader';
import ClassNames from 'classnames';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../SectionHeader/SectionHeader';
import CustomDropZone from '../CustomDropZone/CustomDropZone';
import { addImageToChild } from '../../../redux/thunks';
import { StyleProps, PropsClasses, useStyles, Props } from './AddingImageStyle';
import 'react-dropzone-uploader/dist/styles.css';

const AddingImage: React.FC<Props> = (props) => {
  const { childId } = props;
  const dispatch = useDispatch();
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: switchIsOn,
  });

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file && childId !== null) {
      dispatch(addImageToChild(files[0].file, childId));
    }
    allFiles.forEach((f) => f.remove());
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="Aby zmienić kolejność zdjęć, na górnej liście złap wybrane zdjęcie i
         przenieś w wybrane przez siebie miejsce w obrembie górnej listy.
         Aby usunąć zdjęcie złap je z górnej listy i przenieś na dolną listę. Naciśnięcie przycisku
         ZATWIERDŹ ZMIANY dokona aktualizacji listy zdjęć."
        text="Włącz/Wyłącz sekcję dodawania i edycji zdjęć"
      />
      <div
        style={{
          margin: '0 auto',
        }}
      ></div>
      <CardBody>
        <CustomDropZone
          handleSubmit={handleSubmit}
          isDisabled={!switchIsOn}
          buttonLabel="DODAJ ZDJĘCIE"
          acceptFiles="image/jpg, image/jpeg, image/png"
          dropFieldLabel="Upuść zdjęcie lub kliknij"
          dropFieldLabelReject="Tylko plik ze zdjęciem (jpg, jpeg, png)"
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
