import mongoose, { Schema } from 'mongoose';

export interface IChild {
    _id?: string;
    _idParent?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    info: string;
    images: string[];
}

const childSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    info: { type: String, required: true },
    images: [{ type: String }],
    parent: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
})

export const ChildModel = mongoose.model<IChild & mongoose.Document>('Child', childSchema);
export const buildChild = (data: IChild) => {
    return new ChildModel(data);
}