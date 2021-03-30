import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import { getSuccess, getPending } from '../../../redux/actions/requestActions';
import { getMessages } from '../../../redux/actions/messageActions';
import { getUserId } from '../../../redux/actions/userActions';
import { updateMessageIsReaded } from '../../../redux/thunks';
import { IMessage, MessageOptions } from '../../../types/global';
import MessageOperations from '../MessageOperations/MessageOperations';
import UsersSearcher from '../UsersSearcher/UsersSearcher';
import MessageItem from '../MessageItem/MessageItem';
import { API_URL } from '../../../config';
import {
  StyleProps,
  useStyles,
  Props,
  PropsClasses,
} from './MessagesContentStyle';

const MessagesContent: React.FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const classes: PropsClasses = useStyles({} as StyleProps);
  const { dataType, isAdmin, isSearchMode, getSelectedUser } = props;
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [selectedUserName, setSelectedUserName] = useState<string | undefined>(
    undefined
  );
  const [selectedUserEmail, setSelectedUserEmail] = useState<
    string | undefined
  >(undefined);
  const [selectedId, setSelectedId] = useState<string>('Brak wiadomości');
  const [isAdminMessage, setIsAdminMessage] = useState<boolean>(false);
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const userId = useSelector(getUserId);
  const dispatch = useDispatch();

  const rootClasses = classnames({
    [classes.root]: true,
    [classes.adminHeight]: isAdmin,
    [classes.parentHeight]: !isAdmin,
  });

  useEffect(() => {
    if (messages.length > 0 && isSuccess && !isPending) {
      setSelectedMessage(messages[0].content);
      setSelectedId(messages[0]._id);
      setIsAdminMessage(messages[0].from === userId);
      setSelectedUserName(messages[0].userName);
      setSelectedUserEmail(messages[0].userEmail);
    }
    if (messages.length === 0 && isSuccess && !isPending) {
      setSelectedMessage('Brak wiadomości');
      setSelectedId('');
    }
  }, [messages.length, isPending, isSuccess]);

  const selectedItemHandling = (
    id: string,
    content: string,
    isNew: boolean,
    userName: string | undefined,
    userEmail: string | undefined,
    isAdminMessage: boolean,
    isUser: boolean | undefined
  ) => {
    setSelectedMessage(content);
    setSelectedUserName(userName);
    setSelectedUserEmail(userEmail);
    setSelectedId(id);
    setIsAdminMessage(isAdminMessage);
    if (
      isNew &&
      (dataType === MessageOptions.incoming || dataType === MessageOptions.all)
    )
      dispatch(updateMessageIsReaded(id, isAdmin, isUser));
  };
  return (
    <div className={rootClasses}>
      <Paper variant="outlined" className={classes.window}>
        <p className={classes.content}>{selectedMessage}</p>
      </Paper>
      {isAdmin &&
        (isSearchMode ? (
          <UsersSearcher
            api={`${API_URL}/admin/names/`}
            label="Wyszukaj..."
            getSelectedItem={getSelectedUser!}
            isDisabled={isPending}
          />
        ) : (
          <MessageOperations
            userName={selectedUserName!}
            userEmail={selectedUserName!}
            messageId={selectedId!}
            dataType={dataType}
            isAdminMessage={isAdminMessage}
          />
        ))}
      <div className={classes.list}>
        {messages.length > 0
          ? messages.map((item: IMessage) => {
              return (
                <MessageItem
                  from={item.from}
                  userEmail={item.userEmail}
                  userName={item.userName}
                  dataType={dataType}
                  selectedId={selectedId}
                  getData={selectedItemHandling}
                  key={item._id}
                  _id={item._id}
                  date={item.created}
                  message={item.content}
                  isNew={item.new}
                  isUser={isAdmin && item.isUser}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default MessagesContent;
