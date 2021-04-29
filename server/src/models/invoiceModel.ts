import mongoose, { Schema } from 'mongoose';

export interface IInvoice {
    _id?: string;
    addDate?: Date;
    description: string;
    content: string[];
}

const invoiceSchema = new Schema({
    addDate: { type: Date, default: new Date() },
    description: { type: String, required: true },
    content: [{ type: String, default: [] }]
})

export const InvoiceModel = mongoose.model<IInvoice & mongoose.Document>('Invoice', invoiceSchema);
export const buildInvoice = (data: IInvoice) => {
    return new InvoiceModel(data);
}