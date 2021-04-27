import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IDropzoneProps } from 'react-dropzone-uploader';
import ClassNames from 'classnames';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import Paper from '@material-ui/core/Paper';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../SectionHeader/SectionHeader';
import CustomDropZone from '../CustomDropZone/CustomDropZone';
import CustomButton from '../CustomButton/CustomButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ImageEditor from '../ImageEditor/ImageEditor';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { addImageToChild } from '../../../redux/thunks';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  Props,
  OperationButton,
  FddSwitch,
  ArrowButton,
} from './AddingImageStyle';
import 'react-dropzone-uploader/dist/styles.css';
import logo from '../../../images/butterfly.png';
import { ArrowsDirection } from '../../../types/global';

const AddingImage: React.FC<Props> = (props) => {
  const { childId } = props;
  const dispatch = useDispatch();
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isGetImage, setIsGetImage] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<boolean | null>(null);
  const [isRotate, setIsRotate] = useState<boolean | null>(null);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [enteredImage, setEnteredImage] = useState<any>(null);
  const [isAvatar, setIsAvatar] = useState<boolean>(false);
  const [preview, setPreview] = useState<any>(logo);
  const [arrow, setArrow] = useState<ArrowsDirection>(ArrowsDirection.null);

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn,
  });

  const previewClasses = ClassNames({
    [classes.back]: true,
    [classes.preview]: true,
    [classes.activePreview]: switchIsOn,
  });

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (files[0].file && childId !== null) {
      setEnteredImage(files[0].file);

      const reader = new FileReader();
      reader.onload = () => {
        setEnteredImage(reader.result as any);
      };
      reader.readAsDataURL(files[0].file);
      // dispatch(addImageToChild(files[0].file, childId));
    }
    allFiles.forEach((f) => f.remove());
  };

  const getPreviewFromEditor = (image: string, isDone: boolean): any => {
    // console.log(image);
    if (isDone) setPreview(image);
    setIsGetImage(false);
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const switchIsAvatarSelectedHandling = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsAvatar(e.target.checked);
  };

  const newImageHandling = () => {
    // console.log('newImage');
    // setEnteredImage(null);
    // setIsPreview(!isPreview);
  };

  const zoomHandling = async (isZoom: boolean) => {
    await setIsZoom(isZoom);
    await setIsZoom(null);
  };

  const rotateHandling = async (isRotate: boolean) => {
    await setIsRotate(isRotate);
    await setIsRotate(null);
  };

  const resetHandling = async () => {
    await setIsReset(true);
    await setIsReset(false);
  };

  const arrowHandling = async (arrow: ArrowsDirection) => {
    await setArrow(arrow);
    await setArrow(ArrowsDirection.null);
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
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CustomDropZone
              handleSubmit={handleSubmit}
              isDisabled={!switchIsOn}
              buttonLabel="DODAJ ZDJĘCIE"
              acceptFiles="image/jpg, image/jpeg, image/png"
              dropFieldLabel="Upuść zdjęcie lub kliknij"
              dropFieldLabelReject="Tylko plik ze zdjęciem (jpg, jpeg, png)"
            />
            <Paper elevation={3} className={previewClasses}>
              <Paper elevation={6}>
                <img
                  src={preview}
                  alt="logo"
                  style={{ maxWidth: '250px', maxHeight: '188px' }}
                />
              </Paper>
            </Paper>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ImageEditor
              enteredImage={enteredImage}
              isGetImage={isGetImage}
              getPreview={getPreviewFromEditor}
              isZoom={isZoom}
              isRotate={isRotate}
              isReset={isReset}
              isAvatar={isAvatar}
              arrow={arrow}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className="">
        <GridContainer
          justify="center"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <CustomButton setColor="primary" setSize="md">
              Zapisz zdjęcie
            </CustomButton>
            <CustomButton
              setColor="primary"
              setSize="md"
              onClick={newImageHandling}
            >
              Zmień zdjęcie
            </CustomButton>
            <FormControlLabel
              classes={{
                label: classes.avatar,
              }}
              control={
                <FddSwitch
                  checked={isAvatar}
                  onChange={switchIsAvatarSelectedHandling}
                />
              }
              label="Avatar"
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <OperationButton onClick={() => setIsGetImage(true)}>
              <PhotoCameraIcon fontSize="large" />
            </OperationButton>
            <OperationButton onClick={resetHandling}>
              <CancelPresentationIcon fontSize="large" />
            </OperationButton>
            <div className={classes.arrowsBox}>
              <ArrowButton onClick={() => arrowHandling(ArrowsDirection.left)}>
                <ArrowLeftIcon fontSize="large" />
              </ArrowButton>
              <div className={classes.upDown}>
                <ArrowButton onClick={() => arrowHandling(ArrowsDirection.up)}>
                  <ArrowDropUpIcon fontSize="large" />
                </ArrowButton>
                <ArrowButton
                  onClick={() => arrowHandling(ArrowsDirection.down)}
                >
                  <ArrowDropDownIcon fontSize="large" />
                </ArrowButton>
              </div>
              <ArrowButton onClick={() => arrowHandling(ArrowsDirection.right)}>
                <ArrowRightIcon fontSize="large" />
              </ArrowButton>
            </div>
            <div style={{ display: 'inherit' }}>
              <OperationButton onClick={() => zoomHandling(true)}>
                <ZoomInIcon fontSize="large" />
              </OperationButton>
              <OperationButton onClick={() => zoomHandling(false)}>
                <ZoomOutIcon fontSize="large" />
              </OperationButton>
              <OperationButton onClick={() => rotateHandling(false)}>
                <RotateLeftIcon fontSize="large" />
              </OperationButton>
              <OperationButton onClick={() => rotateHandling(true)}>
                <RotateRightIcon fontSize="large" />
              </OperationButton>
            </div>
          </GridItem>
        </GridContainer>
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
