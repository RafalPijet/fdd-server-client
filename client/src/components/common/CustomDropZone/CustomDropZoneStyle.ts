import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';
import { IDropzoneProps } from 'react-dropzone-uploader';

const customDropZoneStyle = (theme: Theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
})

export interface StyleProps {
    root: BaseCSSProperties
}

export interface Props {
    handleSubmit: IDropzoneProps['onSubmit'];
    buttonLabel: string;
    isDisabled: boolean;
    dropFieldLabel: string;
    dropFieldLabelReject: string;
    acceptFiles: string;
}

export type PropsClasses = Record<keyof StyleProps, string>;
export const useStyles = makeStyles(customDropZoneStyle as any);