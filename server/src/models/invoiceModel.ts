import mongoose, { Schema } from 'mongoose';

export interface IInvoice {
    _id?: string;
    childId: string;
    createdAt?: Date;
    uptatedAt?: Date;
    description: string;
    content: string[];
}

const invoiceSchema = new Schema({
    description: { type: String, required: true },
    content: [{ type: String, default: [] }],
    childId: {
        ref: 'Child',
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

export const InvoiceModel = mongoose.model<IInvoice & mongoose.Document>('Invoice', invoiceSchema);
export const buildInvoice = (data: IInvoice) => {
    return new InvoiceModel(data);
}