import mongoose, { Schema } from 'mongoose';
import { IUser } from './';

export interface IMessage {
    _id?: string;
    created?: Date;
    from: IUser["_id"];
    to: IUser["_id"];
    content: string;
    new?: boolean;
}

const messageSchema = new Schema({
    created: { type: Date, default: Date.now },
    from: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    to: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    content: { type: String, required: true },
    new: { type: Boolean, default: true }
})

export const MessageModel = mongoose.model<IMessage & mongoose.Document>('Message', messageSchema);
export const buildMessage = (data: IMessage) => {
    return new MessageModel(data);
}