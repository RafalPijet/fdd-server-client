import React from 'react';
import MessagesContent from '../MessagesContent/MessagesContent';
import CustomInput from '../CustomInput/CustomInput';
import UsersSearcher from '../UsersSearcher/UsersSearcher';
import { MessageOptions } from '../../../types/global';
import { API_URL } from '../../../config';

interface MessagesBodyProps {
  messageType: MessageOptions;
  disabled: boolean;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isAdmin: boolean;
}

const MessagesBody: React.FC<MessagesBodyProps> = (props) => {
  const { messageType, disabled, label, value, onChange, isAdmin } = props;

  if (messageType === MessageOptions.all) {
    return <MessagesContent isAdmin={isAdmin} dataType={messageType} />;
  } else if (messageType === MessageOptions.incoming) {
    return <MessagesContent isAdmin={isAdmin} dataType={messageType} />;
  } else if (messageType === MessageOptions.outcoming) {
    return <MessagesContent isAdmin={isAdmin} dataType={messageType} />;
  } else if (messageType === MessageOptions.new) {
    return (
      <div>
        {isAdmin && (
          <UsersSearcher api={`${API_URL}/admin/names/`} label="Wyszukaj..." />
        )}
        <CustomInput
          isDisabled={disabled}
          labelText={label}
          id="newMessage"
          value={value}
          onChange={onChange}
          formControlProps={{
            fullWidth: true,
          }}
          white
          inputProps={{
            multiline: true,
            rows: 7,
            autoFocus: true,
          }}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default MessagesBody;
