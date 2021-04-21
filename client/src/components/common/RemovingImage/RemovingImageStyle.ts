import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const removingImageStyle = (theme: Theme) => ({
    root: {
        height: '450px',
        backgroundColor: "rgba(255, 255, 255, 0.6)"
        // backgroundColor: "rgba(166, 206, 57, 0.8)"
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
        alignItems: "center"
    },
    row: {
        width: "100%",
        minHeight: "100px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    footer: {
        justifyContent: "center"
    }
})

export interface StyleProps {
    root: BaseCSSProperties;
    active: BaseCSSProperties;
    disabled: BaseCSSProperties;
    body: BaseCSSProperties;
    row: BaseCSSProperties;
    footer: BaseCSSProperties;
}

export interface State {
    contentList: string[];
    removeList: string[];
}

export interface Props {
    imagesUrl: string[];
    childId?: string;
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

const grid = 3;

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

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(removingImageStyle as any);