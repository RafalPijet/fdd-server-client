import mongoose, { Schema } from 'mongoose';

export interface INews {
    _id?: string;
    title: string;
    content: string;
    images: string[];
    createdAt?: Date;
    uptatedAt?: Date;
}

const newsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String, default: [] }]
}, { timestamps: true })

export const NewsModel = mongoose.model<INews & mongoose.Document>('News', newsSchema);
export const buildNews = (data: INews) => {
    return new NewsModel(data);
}