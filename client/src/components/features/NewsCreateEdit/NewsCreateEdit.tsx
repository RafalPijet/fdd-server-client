import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import GridContainer from '../../common/Grid/GridContainer';
import GridItem from '../../common/Grid/GridItem';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomInput from '../../common/CustomInput/CustomInput';
import CustomButton from '../../common/CustomButton/CustomButton';
import RemovingImage from '../../common/RemovingImage/RemovingImage';
import AddingImage from '../../common/AddingImage/AddingImage';
import { addNewsRequest } from '../../../redux/thunks';
import { getPending } from '../../../redux/actions/requestActions';
import {
  AvailableDestinations,
  FddSwitch,
  NewsState,
} from '../../../types/global';
import { primaryColor } from '../../../styles/globalStyles';
import { State } from '../../common/RemovingImage/RemovingImageStyle';
import { Props, useStyles } from './NewsCreateEditStyle';

const NewsCreateEdit: React.FC<Props> = (props) => {
  const { currentNews } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getPending);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentNewsState, setCurrentNewsState] = useState<NewsState>({
    isPublication: false,
    title: '',
    content: '',
    images: [],
  });
  const [isError, setIserror] = useState<
    Record<
      keyof Omit<
        NewsState,
        'isPublication' | 'images' | '_id' | 'createdAt' | 'uptatedAt'
      >,
      boolean
    >
  >({
    title: false,
    content: false,
  });

  useEffect(() => {
    if (isEdit) {
      if (currentNews !== null)
        setCurrentNewsState({
          isPublication: currentNews.isPublication,
          title: currentNews.title,
          content: currentNews.content,
          images: currentNews.images,
        });
    } else {
      setCurrentNewsState({
        isPublication: false,
        title: '',
        content: '',
        images: [],
      });
    }
  }, [isEdit]);

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
    if (!isEdit)
      setIsDisabled(
        currentNewsState.content.length === 0 ||
          currentNewsState.title.length === 0 ||
          isError.content ||
          isError.title
      );
  }, [isEdit, isError]);

  const currentNewsImagesHandling = (data: State) => {
    console.log(data);
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
    setCurrentNewsState({
      ...currentNewsState,
      isPublication: e.target.checked,
    });
  };

  const confirmButtonHandling = () => {
    if (isEdit) {
      console.log('Edit mode');
    } else {
      dispatch(addNewsRequest(currentNewsState));
    }
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card className={classes.typingArea}>
            <CardBody>
              <CustomInput
                isDisabled={isPending}
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
                isDisabled={isPending}
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
                  rows: 10,
                }}
              />
            </CardBody>
            <CardFooter className={classes.footer}>
              <GridContainer style={{ width: '100%' }}>
                <GridItem
                  xs={4}
                  sm={4}
                  md={4}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormControlLabel
                    disabled={isPending}
                    classes={{
                      label: classes.switchLabel,
                    }}
                    label="PUBLIKUJ"
                    control={
                      <FddSwitch
                        checked={currentNewsState.isPublication}
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
                    disabled={isDisabled || isPending}
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
                    disabled={isPending}
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
          <RemovingImage
            imagesUrl={currentNews !== null ? currentNews.images : []}
            childId={null}
            name={AvailableDestinations.removingImage}
            isNewsHandling={true}
            getImagesState={currentNewsImagesHandling}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <AddingImage
            childId={null}
            name={AvailableDestinations.addingImage}
            selectedChild={undefined}
          />
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default NewsCreateEdit;
