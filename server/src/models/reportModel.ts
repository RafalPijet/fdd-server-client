import mongoose, { Schema } from 'mongoose';

export interface IReport {
    _id?: string;
    createdAt?: Date;
    uptatedAt?: Date;
    report: string;
    title: string;
}

const reportSchema = new Schema({
    report: { type: String, required: true },
    title: { type: String, required: true }
}, { timestamps: true })

export const ReportModel = mongoose.model<IReport & mongoose.Document>('Report', reportSchema);
export const buildReport = (data: IReport) => {
    return new ReportModel(data);
}