import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Card from '../../common/Card/Card';
import CardBody from '../../common/CardBody/CardBody';
import CardFooter from '../../common/CardFooter/CardFooter';
import DragDropImageItem from '../DragDropImageItem/DragDropImageItem';
import CustomBotton from '../CustomButton/CustomButton';
import {
  Props,
  State,
  StyleProps,
  PropsClasses,
  useStyles,
  reorder,
  move,
  getItemStyle,
  getListStyle,
} from './RemovingImageStyle';

const RemovingImage: React.FC<Props> = (props) => {
  const { imagesUrl, childId } = props;
  const classes: PropsClasses = useStyles({} as StyleProps);
  const [state, setState] = useState<State>({
    contentList: imagesUrl,
    removeList: [],
  });
  const [switchIsOn, setSwitchIsOn] = useState<boolean>(false);
  const rootClasses = ClassNames({
    [classes.root]: true,
    [classes.active]: switchIsOn,
  });

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
        contentList: result.droppable1 ? result.droppable1 : state.contentList,
        removeList: result.droppable2 ? result.droppable2 : state.removeList,
      });
    }
  };

  const confirmButtonHandling = () => {
    console.log(state);
  };

  const switchChangeHandling = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setSwitchIsOn(e.target.checked);
  };

  return (
    <Card className={rootClasses}>
      <Switch checked={switchIsOn} onChange={switchChangeHandling} />
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
                      //   isDragDisabled={true}
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
                          <DragDropImageItem imageUrl={item} />
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
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
                    <Draggable key={item} draggableId={item} index={index}>
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
                          <DragDropImageItem imageUrl={item} />
                        </Paper>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </CardBody>
      <CardFooter className={classes.footer}>
        <CustomBotton
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
