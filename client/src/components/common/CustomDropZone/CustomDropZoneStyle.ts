import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IDropzoneProps } from 'react-dropzone-uploader';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '230px',
        width: '100%',
        backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
}))

export interface Props {
    handleSubmit: IDropzoneProps['onSubmit'];
    buttonLabel: string;
    isDisabled: boolean;
    dropFieldLabel: string;
    dropFieldLabelReject: string;
    acceptFiles: string;
}
