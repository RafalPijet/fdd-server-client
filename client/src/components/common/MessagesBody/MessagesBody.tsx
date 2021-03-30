import React, { useState, useEffect } from 'react';
import MessagesContent from '../MessagesContent/MessagesContent';
import CustomInput from '../CustomInput/CustomInput';
import UsersSearcher from '../UsersSearcher/UsersSearcher';
import { UserName } from '../UsersSearcher/UsersSearcherStyle';
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
  getSelectedUser?: (user: UserName | null) => void;
}

const MessagesBody: React.FC<MessagesBodyProps> = (props) => {
  const {
    messageType,
    disabled,
    label,
    value,
    onChange,
    isAdmin,
    getSelectedUser,
  } = props;
  const [selectedUser, setSelectedUser] = useState<UserName | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isAdmin) {
      setIsReady(selectedUser !== null && !disabled);
    } else {
      setIsReady(!disabled);
    }
    if (getSelectedUser !== undefined) {
      getSelectedUser(selectedUser);
    }
  }, [selectedUser, disabled]);

  const userHandling = (item: UserName | null) => {
    setSelectedUser(item);
  };

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
          <UsersSearcher
            api={`${API_URL}/admin/names/`}
            label="Wyszukaj..."
            getSelectedItem={userHandling}
            isDisabled={disabled}
          />
        )}
        <CustomInput
          isDisabled={!isReady}
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
            rows: isAdmin ? 11 : 12,
            autoFocus: true,
          }}
        />
      </div>
    );
  } else if (messageType === MessageOptions.search) {
    return (
      <MessagesContent
        isAdmin={isAdmin}
        dataType={messageType}
        isSearchMode={true}
        getSelectedUser={userHandling}
      />
    );
  } else {
    return <></>;
  }
};

export default MessagesBody;
