import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDropzoneProps } from 'react-dropzone-uploader';
import ClassNames from 'classnames';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import SectionHeader from '../SectionHeader/SectionHeader';
import CustomDropZone from '../CustomDropZone/CustomDropZone';
import CustomButton from '../CustomButton/CustomButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageEditor from '../ImageEditor/ImageEditor';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
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
import { addImageToChild, addAvatarToChild } from '../../../redux/thunks';
import {
  getAdding,
  getAddingSuccess,
  resetAddingRequest,
  getAddingError,
} from '../../../redux/actions/requestActions';
import {
  StyleProps,
  PropsClasses,
  useStyles,
  Props,
  OperationButton,
  ArrowButton,
} from './AddingImageStyle';
import 'react-dropzone-uploader/dist/styles.css';
import logo from '../../../images/butterfly.png';
import smile from '../../../images/smile.svg';
import { ArrowsDirection, FddSwitch } from '../../../types/global';
import { urltoFile } from '../../../types/functions';

const AddingImage: React.FC<Props> = (props) => {
  const { childId, selectedChild } = props;
  const dispatch = useDispatch();
  const isAdding = useSelector(getAdding);
  const isSuccess = useSelector(getAddingSuccess);
  const isError = useSelector(getAddingError).isError;
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
  const [file, setFile] = useState<File | undefined>();

  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.back]: true,
    [classes.active]: switchIsOn || isAdding,
  });

  const previewClasses = ClassNames({
    [classes.back]: true,
    [classes.preview]: true,
    [classes.activePreview]: switchIsOn || isAdding,
  });

  const previewContentClasses = ClassNames({
    [classes.back]: true,
    [classes.previewContent]: true,
    [classes.activePreview]: switchIsOn || isAdding,
  });

  useEffect(() => {
    if (isError) dispatch(resetAddingRequest());
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setEnteredImage(null);
      setPreview(logo);
      setFile(undefined);
    }
  }, [isSuccess]);

  const handleSubmit: IDropzoneProps['onSubmit'] = async (files, allFiles) => {
    if (preview !== logo) setPreview(logo);
    if (files[0].file && childId !== null) {
      setEnteredImage(files[0].file);

      const reader = new FileReader();
      reader.onload = () => {
        setEnteredImage(reader.result as any);
      };
      reader.readAsDataURL(files[0].file);
    }
    allFiles.forEach((f) => f.remove());
  };

  const addImageFileToChild = () => {
    if (file && childId !== null) {
      if (isAvatar) {
        dispatch(addAvatarToChild(file, childId));
      } else {
        dispatch(addImageToChild(file, childId));
      }
    }
  };

  const cancelSelectedImage = () => {
    setEnteredImage(null);
    setPreview(logo);
    setFile(undefined);
  };

  const getPreviewFromEditor = async (image: string, isDone: boolean) => {
    if (isDone) {
      await setPreview(image);
      dispatch(resetAddingRequest());
      await urltoFile(
        image,
        `${selectedChild?.firstName}_${selectedChild?.lastName}.png`
      ).then((file) => {
        setFile(file);
      });
      setIsGetImage(false);
    } else {
      setIsGetImage(false);
    }
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  const switchIsAvatarSelectedHandling = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsAvatar(e.target.checked);
    if (preview !== logo) setPreview(logo);
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
        isExistChild={true}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="Aby dodać zdjęcie, upuść je lub kliknij w celu wyboru zdjęcia z Twojego dysku.
         Następnie klikając przycisk DODAJ ZDJĘCIE, przenosisz je do pola edytora, natomiast klikając X,
          wracasz do mozliwości dodania innego zdjęcia. Suwakiem PORTRET ustalasz, czy będziesz dodawać 
          portret - miniaturkę dziecka czy jedno z 5-ciu zdjęć kolekcji. Standardowo ustawiona jest
           opcja dodawania zdjęć kolekcji. W edytorze powinieneś wykadrować docelowe zdjęcię.
            Ramka kadrowania jest inna dla zdjęcia niz dla portretu. Uzywając przycisków edytora mozesz
            zblizać, oddalać, obracać oraz przesuwać obrabiane zdjęcie. Jeśli chcesz cofnąć zmiany podczas
            kadrowania, naciśnij przycisk z ikoną prostokąta z krzyzykiem. Jeśli wykadrowałeś w sposób zadowalający
             Cię naciśnij przycisk z ikoną aparatu fotograficznego. Zobaczysz wówczas gotowe zdjęcie. Mozesz oczywiście ponownie wrócić do kadrowania zdjęcia, czy portetu.
              Po naciśnięciu przycisku ZAPISZ ZDJĘCIE nastąpi dodanie zdjęcia do kolekcji lub portretu.
              Pamiętaj, ze w kolekcji mozesz mieć tylko 5 zdjęć! Naciśnięcia przycisku ANULUJ
              likwiduje cały proces dodawania nowego zdjęcia."
        text="Włącz/Wyłącz sekcję dodawania i edycji zdjęć."
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
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <CustomDropZone
              handleSubmit={handleSubmit}
              isDisabled={
                selectedChild === undefined ||
                !switchIsOn ||
                isAdding ||
                (!isAvatar && selectedChild!.images.length > 4)
              }
              buttonLabel="DODAJ ZDJĘCIE"
              acceptFiles="image/jpg, image/jpeg, image/png"
              dropFieldLabel="Upuść zdjęcie lub kliknij"
              dropFieldLabelReject="Tylko plik ze zdjęciem (jpg, jpeg, png)"
            />
            <Paper elevation={3} className={previewClasses}>
              <Zoom
                in={preview !== logo && isGetImage === false}
                timeout={1000}
              >
                <img
                  src={smile}
                  alt="smile"
                  style={{ width: '60px', marginLeft: '30px' }}
                />
              </Zoom>
              <Paper variant="outlined" className={previewContentClasses}>
                {isGetImage ? (
                  <CircularProgress />
                ) : (
                  <img
                    src={preview}
                    alt="logo"
                    style={{
                      maxWidth: '250px',
                      maxHeight: '188px',
                      filter: `${
                        !switchIsOn || isAdding
                          ? 'grayscale(100)'
                          : 'grayscale(0)'
                      }`,
                    }}
                  />
                )}
              </Paper>
              <Zoom
                in={preview !== logo && isGetImage === false}
                timeout={1000}
              >
                <DoneOutlineIcon
                  className={classes.avatar}
                  style={{ marginRight: '30px' }}
                  fontSize="large"
                />
              </Zoom>
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
              isDisabled={!switchIsOn || isAdding}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter className="">
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
            <CustomButton
              setColor="primary"
              setSize="md"
              disabled={
                !switchIsOn ||
                isAdding ||
                file === undefined ||
                preview === logo
              }
              onClick={addImageFileToChild}
            >
              {isAvatar ? 'Zapisz portret' : 'Zapisz zdjęcie'}
            </CustomButton>
            <CustomButton
              setColor="primary"
              setSize="md"
              disabled={!switchIsOn || isAdding || file === undefined}
              onClick={cancelSelectedImage}
            >
              Anuluj
            </CustomButton>
            <FormControlLabel
              disabled={
                !switchIsOn ||
                isAdding ||
                (isAvatar &&
                  selectedChild !== undefined &&
                  selectedChild.images.length > 4)
              }
              classes={{
                label: classes.avatar,
              }}
              control={
                <FddSwitch
                  checked={isAvatar}
                  onChange={switchIsAvatarSelectedHandling}
                />
              }
              label="PORTRET"
            />
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            lg={6}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <OperationButton
              onClick={() => setIsGetImage(true)}
              disabled={
                !switchIsOn || isAdding || enteredImage === null || isGetImage
              }
            >
              <PhotoCameraIcon fontSize="large" />
            </OperationButton>
            <OperationButton
              onClick={resetHandling}
              disabled={!switchIsOn || isAdding || enteredImage === null}
            >
              <CancelPresentationIcon fontSize="large" />
            </OperationButton>
            <div className={classes.arrowsBox}>
              <ArrowButton
                onClick={() => arrowHandling(ArrowsDirection.left)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
                <ArrowLeftIcon fontSize="large" />
              </ArrowButton>
              <div className={classes.upDown}>
                <ArrowButton
                  onClick={() => arrowHandling(ArrowsDirection.up)}
                  disabled={!switchIsOn || isAdding || enteredImage === null}
                >
                  <ArrowDropUpIcon fontSize="large" />
                </ArrowButton>
                <ArrowButton
                  onClick={() => arrowHandling(ArrowsDirection.down)}
                  disabled={!switchIsOn || isAdding || enteredImage === null}
                >
                  <ArrowDropDownIcon fontSize="large" />
                </ArrowButton>
              </div>
              <ArrowButton
                onClick={() => arrowHandling(ArrowsDirection.right)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
                <ArrowRightIcon fontSize="large" />
              </ArrowButton>
            </div>
            <div style={{ display: 'inherit' }}>
              <OperationButton
                onClick={() => zoomHandling(true)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
                <ZoomInIcon fontSize="large" />
              </OperationButton>
              <OperationButton
                onClick={() => zoomHandling(false)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
                <ZoomOutIcon fontSize="large" />
              </OperationButton>
              <OperationButton
                onClick={() => rotateHandling(false)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
                <RotateLeftIcon fontSize="large" />
              </OperationButton>
              <OperationButton
                onClick={() => rotateHandling(true)}
                disabled={!switchIsOn || isAdding || enteredImage === null}
              >
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
