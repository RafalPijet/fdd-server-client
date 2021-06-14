import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import RemovingImage from '../../common/RemovingImage/RemovingImage';
import AddingImage from '../../common/AddingImage/AddingImage';
import {
  addNewsRequest,
  updatePicturesListRequest,
  updateNewsPublication,
  updateNewsDataRequest,
} from '../../../redux/thunks';
import {
  getPending,
  getAdding,
  getUpdating,
  getSuccess,
  getAddingSuccess,
  getUpdatingSuccess,
  resetRequest,
  resetAddingRequest,
  resetUpdatingRequest,
} from '../../../redux/actions/requestActions';
import {
  setUserToast,
  setModalAreYouSure,
} from '../../../redux/actions/generalActions';
import {
  AvailableDestinations,
  FddSwitch,
  NewsState,
  FddTooltip,
  NewsDataUpdate,
  ModalAYSModes,
} from '../../../types/global';
import { primaryColor } from '../../../styles/globalStyles';
import { State } from '../../common/RemovingImage/RemovingImageStyle';
import { Props, useStyles } from './NewsCreateEditStyle';

const NewsCreateEdit: React.FC<Props> = (props) => {
  const { currentNews, newsQuantity } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const isAdding = useSelector(getAdding);
  const isUpdating = useSelector(getUpdating);
  const isSuccess = useSelector(getSuccess);
  const isAddingSuccess = useSelector(getAddingSuccess);
  const isUpdatingSuccess = useSelector(getUpdatingSuccess);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentNewsState, setCurrentNewsState] = useState<NewsState>({
    publication: false,
    title: '',
    content: '',
    images: [],
  });
  const [isError, setIserror] = useState<
    Record<
      keyof Omit<
        NewsState,
        'publication' | 'images' | '_id' | 'createdAt' | 'uptatedAt'
      >,
      boolean
    >
  >({
    title: false,
    content: false,
  });

  const deleteButtonClasses = ClassNames({
    [classes.icon]: isEdit,
    [classes.disabled]: !isEdit || isPending || isAdding || isUpdating,
  });

  useEffect(() => {
    if (isEdit) {
      if (currentNews !== null && !isUpdating) {
        setCurrentNewsState({
          publication: currentNews.publication,
          title: currentNews.title,
          content: currentNews.content,
          images: currentNews.images,
        });
      }
    } else {
      setCurrentNewsState({
        publication: false,
        title: '',
        content: '',
        images: [],
      });
    }
  }, [isEdit, currentNews, isUpdating]);

  useEffect(() => {
    setIserror({
      ...isError,
      title:
        currentNewsState.title.length > 0 && currentNewsState.title.length < 10,
      content:
        currentNewsState.content.length > 0 &&
        currentNewsState.content.length < 50,
    });
  }, [currentNewsState]);

  useEffect(() => {
    if (!isEdit) {
      setIsDisabled(
        currentNewsState.content.length === 0 ||
          currentNewsState.title.length === 0 ||
          isError.content ||
          isError.title
      );
    } else {
      if (currentNews !== null) {
        setIsDisabled(
          !(
            (currentNewsState.content !== currentNews.content ||
              currentNewsState.title !== currentNews.title) &&
            !isError.title &&
            !isError.content
          )
        );
      }
    }
  }, [isEdit, isError, currentNewsState]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentNewsState({
        publication: false,
        title: '',
        content: '',
        images: [],
      });
      dispatch(resetRequest());
      dispatch(
        setUserToast({
          isOpen: false,
          content: '',
          variant: 'success',
        })
      );
    }
    if (isAddingSuccess) {
      dispatch(resetAddingRequest());
    }
    if (isUpdatingSuccess) {
      dispatch(resetUpdatingRequest());
    }
  }, [isSuccess, isAddingSuccess, isUpdatingSuccess]);

  useEffect(() => {
    setIsEdit(newsQuantity >= 5);
  }, [newsQuantity]);

  const currentNewsImagesHandling = (data: State) => {
    if (currentNews !== null && currentNews._id !== undefined) {
      data.id = currentNews._id;
      dispatch(updatePicturesListRequest(data));
    }
  };

  const handleTextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentNewsState({
      ...currentNewsState,
      [event.target.id]: event.target.value,
    });
  };

  const switchIsEditHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEdit(e.target.checked);
  };

  const switchIsPublicHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentNews !== null && currentNews._id !== undefined) {
      dispatch(updateNewsPublication(currentNews._id, e.target.checked));
    }
  };

  const confirmButtonHandling = () => {
    if (isEdit) {
      if (currentNews !== null && currentNews._id !== undefined) {
        const payload: NewsDataUpdate = {
          newsId: currentNews._id,
          title:
            currentNewsState.title !== currentNews.title
              ? currentNewsState.title
              : undefined,
          content:
            currentNewsState.content !== currentNews.content
              ? currentNewsState.content
              : undefined,
        };
        dispatch(updateNewsDataRequest(payload));
      }
    } else {
      dispatch(addNewsRequest(currentNewsState));
    }
  };

  const removeCurrentNewsHandling = () => {
    if (currentNews !== null) {
      dispatch(
        setModalAreYouSure({
          isOpen: true,
          title: 'Usuwanie artykułu',
          mode: ModalAYSModes.removeNews,
          description: `Czy aby napewno? Potwierdzenie spowoduje bezpowrotne usunięcie artykułu: "${currentNews.title}" wraz ze zdjęciami!`,
          data: {
            newsStatus: currentNews,
          },
        })
      );
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card className={classes.typingArea}>
            <CardBody>
              <CustomInput
                isDisabled={isPending || isAdding || isUpdating}
                labelText="Tytuł"
                id="title"
                error={isError.title}
                value={currentNewsState.title}
                onChange={handleTextField}
                formControlProps={{
                  fullWidth: true,
                }}
                labelProps={{ style: { color: primaryColor } }}
                white
              />
              <CustomInput
                isDisabled={isPending || isAdding || isUpdating}
                labelText="Treść"
                id="content"
                error={isError.content}
                value={currentNewsState.content}
                onChange={handleTextField}
                formControlProps={{
                  fullWidth: true,
                }}
                labelProps={{ style: { color: primaryColor } }}
                white
                inputProps={{
                  multiline: true,
                  rows: 9,
                }}
              />
            </CardBody>
            <CardFooter className={classes.footer}>
              <GridContainer style={{ width: '100%' }}>
                <GridItem
                  xs={1}
                  sm={1}
                  md={1}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FddTooltip
                    title="Usuń artukuł"
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    enterDelay={1000}
                    enterNextDelay={1000}
                  >
                    <span>
                      <IconButton
                        onClick={removeCurrentNewsHandling}
                        disabled={
                          isPending || isAdding || isUpdating || !isEdit
                        }
                      >
                        <DeleteForeverIcon
                          className={deleteButtonClasses}
                          fontSize="large"
                        />
                      </IconButton>
                    </span>
                  </FddTooltip>
                </GridItem>
                <GridItem
                  xs={3}
                  sm={3}
                  md={3}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    disabled={
                      isPending ||
                      isAdding ||
                      isUpdating ||
                      !isEdit ||
                      isError.content ||
                      isError.title
                    }
                    classes={{
                      label: classes.switchLabel,
                    }}
                    label="PUBLIKUJ"
                    control={
                      <FddSwitch
                        checked={currentNewsState.publication}
                        onChange={switchIsPublicHandling}
                      />
                    }
                  />
                </GridItem>
                <GridItem
                  xs={4}
                  sm={4}
                  md={4}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <CustomButton
                    setSize="md"
                    setColor="primary"
                    onClick={confirmButtonHandling}
                    disabled={isDisabled || isPending || isAdding || isUpdating}
                  >
                    {isEdit ? 'AKTUALIZUJ PUBLIKACJĘ' : 'DODAJ PUBLIKACJĘ'}
                  </CustomButton>
                </GridItem>
                <GridItem
                  xs={4}
                  sm={4}
                  md={4}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    disabled={isPending || newsQuantity >= 5}
                    classes={{
                      label: classes.switchLabel,
                    }}
                    label="EDYCJA"
                    control={
                      <FddSwitch
                        checked={isEdit}
                        onChange={switchIsEditHandling}
                      />
                    }
                  />
                </GridItem>
              </GridContainer>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {currentNews !== null && (
            <RemovingImage
              isExistChild={false}
              imagesUrl={currentNews !== null ? currentNews.images : []}
              childId={null}
              name={AvailableDestinations.removingImage}
              isNewsHandling={true}
              getImagesState={currentNewsImagesHandling}
            />
          )}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          {currentNews !== null && (
            <AddingImage
              childId={null}
              name={AvailableDestinations.addingImage}
              selectedChild={undefined}
              isExistChild={false}
              helpText="Aby dodać zdjęcie, upuść je lub kliknij w celu wyboru zdjęcia z Twojego dysku.
              Następnie klikając przycisk DODAJ ZDJĘCIE, przenosisz je do pola edytora, natomiast klikając X,
               wracasz do mozliwości dodania innego zdjęcia. W edytorze powinieneś wykadrować docelowe zdjęcię.
             Uzywając przycisków edytora mozesz zblizać, oddalać, obracać oraz przesuwać obrabiane zdjęcie. Jeśli chcesz cofnąć zmiany podczas
                 kadrowania, naciśnij przycisk z ikoną prostokąta z krzyzykiem. Jeśli wykadrowałeś w sposób zadowalający
                  Cię naciśnij przycisk z ikoną aparatu fotograficznego. Zobaczysz wówczas gotowe zdjęcie. Mozesz oczywiście ponownie wrócić do kadrowania zdjęcia.
                   Po naciśnięciu przycisku ZAPISZ ZDJĘCIE nastąpi dodanie zdjęcia do kolekcji.
                   Pamiętaj, ze w kolekcji mozesz mieć tylko 5 zdjęć! Naciśnięcia przycisku ANULUJ
                   likwiduje cały proces dodawania nowego zdjęcia."
              isAvatarAvailable={false}
              newsId={
                currentNews.images.length > 4 ? undefined : currentNews._id
              }
            />
          )}
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default NewsCreateEdit;
