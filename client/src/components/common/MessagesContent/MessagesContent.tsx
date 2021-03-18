import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { getSuccess, getPending } from '../../../redux/actions/requestActions';
import { getMessages } from '../../../redux/actions/messageActions';
import { updateMessageIsReaded } from '../../../redux/thunks';
import { IMessage, MessageOptions } from '../../../types/global';
import MessageItem from '../MessageItem/MessageItem';
import { StyleProps, useStyles, Props } from './MessagesContentStyle';

const MessagesContent: React.FC<Props> = (props) => {
  const messages = useSelector(getMessages);
  const classes = useStyles({} as StyleProps);
  const { dataType, isAdmin } = props;
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [selectedFromName, setSelectedFromName] = useState<string | undefined>(
    undefined
  );
  const [selectedFromEmail, setSelectedFromEmail] = useState<
    string | undefined
  >(undefined);
  const [selectedId, setSelectedId] = useState<string>('Brak wiadomości');
  const isPending = useSelector(getPending);
  const isSuccess = useSelector(getSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages.length > 0 && isSuccess && !isPending) {
      setSelectedMessage(messages[0].content);
      setSelectedId(messages[0]._id);
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
    fromName: string | undefined,
    fromEmail: string | undefined
  ) => {
    setSelectedMessage(content);
    setSelectedFromName(fromName);
    setSelectedFromEmail(fromEmail);
    setSelectedId(id);
    if (
      isNew &&
      (dataType === MessageOptions.incoming || dataType === MessageOptions.all)
    )
      dispatch(updateMessageIsReaded(id));
  };
  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.window}>
        <p className={classes.content}>{selectedMessage}</p>
      </Paper>
      <div className={classes.list}>
        {messages.length > 0
          ? messages.map((item: IMessage) => {
              return (
                <MessageItem
                  from={item.from}
                  fromEmail={item.fromEmail}
                  fromName={item.fromName}
                  dataType={dataType}
                  selectedId={selectedId}
                  getData={selectedItemHandling}
                  key={item._id}
                  _id={item._id}
                  date={item.created}
                  message={item.content}
                  isNew={item.new}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default MessagesContent;
