import React from 'react';
import { useSelector } from 'react-redux';
import { getMessages } from '../../../redux/actions/messageActions';
import { IMessage } from '../../../types/global';
import MessageItem from '../MessageItem/MessageItem';

const MessagesContent: React.FC = () => {
  const messeges = useSelector(getMessages);
  return (
    <div>
      {messeges.map((item: IMessage) => {
        return (
          <MessageItem
            key={item._id}
            _id={item._id}
            date={item.created}
            message={item.content}
          />
        );
      })}
    </div>
  );
};

export default MessagesContent;
