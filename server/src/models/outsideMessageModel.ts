import mongoose, { Schema } from 'mongoose';

export interface IOutsideMessage {
    _id?: string;
    created?: Date;
    name: string;
    email: string;
    content: string;
    new?: boolean;
    answer?: string;
}

const outsideMessageSchema = new Schema({
    created: { type: Date, default: Date.now },
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true },
    new: { type: Boolean, default: true },
    answer: { type: String, default: '' }
})

export const OutSideMessageModel = mongoose.model<IOutsideMessage & mongoose.Document>('OutsideMessage', outsideMessageSchema);
export const buildOutSideMessage = (data: IOutsideMessage) => {
    return new OutSideMessageModel(data);
}