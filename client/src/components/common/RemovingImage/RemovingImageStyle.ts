import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { AvailableDestinations } from '../../../types/global';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '450px',
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    active: {
        backgroundColor: "rgba(166, 206, 57, 0.8)"
    },
    disabled: {
        backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-around"
    },
    row: {
        position: "relative",
        width: "100%",
        minHeight: "100px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    icon: {
        width: "40px",
        height: "40px",
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "35px",
        right: "-18px"
    },
    footer: {
        justifyContent: "center"
    }
}))

export interface State {
    contentList: string[];
    removeList: string[];
    id: string | null;
}

export interface Props {
    imagesUrl: string[];
    childId: string | null;
    name: AvailableDestinations;
    isNewsHandling?: boolean;
    getImagesState?: (state: State) => void;
    isExistChild: boolean;
}

export const reorder = (list: [], startIndex: number, endIndex: number): object => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (
    source: any,
    destination: any,
    droppableSource: any,
    droppableDestination: any
): {} => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    let result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 2;

export const getItemStyle = (isDragging: boolean, draggableStyle: any): object => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 ${grid}px`,
    background: isDragging
        ? 'rgba(155, 51, 178, 0.8)'
        : 'rgba(255, 255, 255, 0.5)',
    ...draggableStyle,
});

export const getListStyle = (
    isDraggingOver: boolean,
    isRemoveList: boolean
): object => ({
    background: isDraggingOver
        ? isRemoveList
            ? '#ED544F'
            : '#A1E1DA'
        : 'rgba(255, 255, 255, 0.4)',
    padding: grid,
    margin: '3px',
    width: '100%',
});