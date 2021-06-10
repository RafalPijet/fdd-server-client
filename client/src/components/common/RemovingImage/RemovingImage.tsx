import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ClassNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import DragDropImageItem from '../DragDropImageItem/DragDropImageItem';
import CustomBotton from '../CustomButton/CustomButton';
import { updateImagesList } from '../../../redux/thunks';
import SectionHeader from '../SectionHeader/SectionHeader';
import {
  getEventChange,
  setEventChange,
} from '../../../redux/actions/generalActions';
import {
  getUpdatingError,
  resetUpdatingRequest,
  getUpdating,
} from '../../../redux/actions/requestActions';
import { EventChangeAvailableDestination } from '../../../types/global';
import {
  Props,
  State,
  useStyles,
  reorder,
  move,
  getItemStyle,
  getListStyle,
} from './RemovingImageStyle';

const RemovingImage: React.FC<Props> = (props) => {
  const {
    imagesUrl,
    childId,
    name,
    isNewsHandling,
    getImagesState,
    isExistChild,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isUpdatingError = useSelector(getUpdatingError).isError;
  const isUpdating = useSelector(getUpdating);
  const eventChange = useSelector(getEventChange);
  const eventData = eventChange.data as EventChangeAvailableDestination;
  const [state, setState] = useState<State>({
    contentList: imagesUrl,
    removeList: [],
    id: childId,
  });
  const [copyState, setCopyState] = useState<Omit<State, 'id'>>({
    contentList: imagesUrl,
    removeList: [],
  });
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const [isNotChanged, setIsNotChanged] = useState<boolean>(true);
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: switchIsOn && !isUpdating,
  });

  useEffect(() => {
    if (eventChange.isAction) {
      setSwitchIsOn(eventData.actionName === name);
      dispatch(setEventChange({ isAction: false, data: undefined }));
    }
  }, [eventChange.isAction]);

  useEffect(() => {
    setState({ contentList: imagesUrl, removeList: [], id: childId });
    setCopyState({ contentList: imagesUrl, removeList: [] });
  }, [imagesUrl, childId]);

  useEffect(() => {
    if (isUpdatingError) dispatch(resetUpdatingRequest());
  }, [isUpdatingError]);

  useEffect(() => {
    setIsNotChanged(
      copyState.contentList.toString() === state.contentList.toString()
    );
  }, [copyState.contentList, state.contentList]);

  const droppableIds = {
    droppable1: 'contentList',
    droppable2: 'removeList',
  };

  const getList = (id: string): any => state[droppableIds[id]];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items: object = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let copiedState: any = Object.assign({}, state);

      if (source.droppableId === 'droppable1') {
        copiedState.contentList = items;
      } else if (source.droppableId === 'droppable2') {
        copiedState.removeList = items;
      }

      setState(copiedState);
    } else {
      const result: any = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setState({
        ...state,
        contentList: result.droppable1 ? result.droppable1 : state.contentList,
        removeList: result.droppable2 ? result.droppable2 : state.removeList,
      });
    }
  };

  const confirmButtonHandling = () => {
    if (isNewsHandling && getImagesState !== undefined) {
      getImagesState(state);
    } else {
      dispatch(updateImagesList(state));
    }
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchIsOn(e.target.checked);
  };

  return (
    <Card className={rootClasses}>
      <SectionHeader
        isExistChild={isExistChild}
        onChange={switchChangeHandling}
        checked={switchIsOn}
        helpText="Aby zmienić kolejność zdjęć, na górnej liście złap wybrane zdjęcie i
         przenieś w wybrane przez siebie miejsce w obrembie górnej listy. 
         Aby usunąć zdjęcie złap je z górnej listy i przenieś na dolną listę. Naciśnięcie przycisku
         ZATWIERDŹ ZMIANY dokona aktualizacji listy zdjęć."
        text="Włącz/Wyłącz sekcję ustawiania kolejności i usuwania zdjęć"
      />
      <CardBody>
        <div className={classes.body}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable1" direction="horizontal">
              {(provided: any, snapshot: any) => (
                <Paper
                  elevation={3}
                  ref={provided.innerRef}
                  className={classes.row}
                  style={getListStyle(snapshot.isDraggingOver, false)}
                >
                  {state.contentList.map((item, index) => (
                    <Draggable
                      key={item}
                      draggableId={item}
                      index={index}
                      isDragDisabled={!switchIsOn || isUpdating}
                    >
                      {(provided: any, snapshot: any) => (
                        <Paper
                          elevation={6}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <DragDropImageItem
                            isDisabled={!switchIsOn || isUpdating}
                            imageUrl={item}
                          />
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className={classes.icon}>
                    <PhotoLibraryIcon
                      fontSize="large"
                      color={switchIsOn && !isUpdating ? 'primary' : 'disabled'}
                    />
                  </div>
                </Paper>
              )}
            </Droppable>
            <Droppable droppableId="droppable2" direction="horizontal">
              {(provided: any, snapshot: any) => (
                <Paper
                  elevation={3}
                  ref={provided.innerRef}
                  className={classes.row}
                  style={getListStyle(snapshot.isDraggingOver, true)}
                >
                  {state.removeList.map((item, index) => (
                    <Draggable
                      key={item}
                      draggableId={item}
                      index={index}
                      isDragDisabled={!switchIsOn || isUpdating}
                    >
                      {(provided: any, snapshot: any) => (
                        <Paper
                          elevation={6}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <DragDropImageItem
                            isDisabled={!switchIsOn || isUpdating}
                            imageUrl={item}
                          />
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className={classes.icon}>
                    <DeleteForeverIcon
                      fontSize="large"
                      color={switchIsOn && !isUpdating ? 'error' : 'disabled'}
                    />
                  </div>
                </Paper>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </CardBody>
      <CardFooter className={classes.footer}>
        <CustomBotton
          disabled={!switchIsOn || isNotChanged || isUpdating}
          setSize="md"
          setColor="primary"
          onClick={confirmButtonHandling}
        >
          Zatwierdź zmiany
        </CustomBotton>
      </CardFooter>
    </Card>
  );
};

export default RemovingImage;
