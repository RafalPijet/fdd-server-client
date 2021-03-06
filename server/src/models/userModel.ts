import mongoose, { Schema } from 'mongoose';
import { UserStatus, IChild } from './';

export interface IUser {
    _id?: string;
    status: UserStatus;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string | undefined;
    zipCode: string;
    town: string;
    street: string;
    number: string;
    children?: IChild[]
}

const userSchema = new Schema({
    status: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    zipCode: { type: String, required: true },
    town: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    children: [{
        ref: 'Child',
        type: mongoose.Schema.Types.ObjectId
    }],
    resetToken: String,
    resetTokenExpiration: Date
})

export const UserModel = mongoose.model<IUser & mongoose.Document>('User', userSchema);
export const buildUser = (data: IUser) => {
    return new UserModel(data);
}