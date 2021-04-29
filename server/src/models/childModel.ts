import mongoose, { Schema } from 'mongoose';
import { IInvoice } from './index';

export interface IChild {
    _id?: string;
    parent: string | undefined;
    active?: boolean;
    firstName: string;
    lastName: string;
    birthDate: Date;
    info: string;
    images?: string[];
    avatar?: string;
    invoices?: IInvoice[];
}

const childSchema = new Schema({
    active: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    info: { type: String, required: true },
    images: [{ type: String, default: [] }],
    avatar: { type: String, default: '' },
    invoices: [{
        ref: 'Invoice',
        type: mongoose.Schema.Types.ObjectId
    }],
    parent: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
})

export const ChildModel = mongoose.model<IChild & mongoose.Document>('Child', childSchema);
export const buildChild = (data: IChild) => {
    return new ChildModel(data);
}