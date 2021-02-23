import mongoose, { Schema } from 'mongoose';
import { UserStatus } from './';

export interface IUser {
    _id?: string;
    status: UserStatus;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string | undefined;
    zipCode: string;
    locality: string;
    street: string;
    number: string;
}

const userSchema = new Schema({
    status: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    zipCode: { type: String, required: true },
    locality: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    resetToken: String,
    resetTokenExpiration: Date
})

export const UserModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export const buildUser = (data: IUser) => {
    return new UserModel(data);
}