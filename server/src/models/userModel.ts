import mongoose, { Schema } from 'mongoose';
import { UserStatus } from './';

export interface IUser {
    status: UserStatus;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    adress: {
        zipCode: string;
        locality: string;
        street: string;
        number: string;
    }
}

const userSchema = new Schema({
    status: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    adress: { type: Object, required: true },
    resetToken: String,
    resetTokenExpiration: Date
})

const UserModel = mongoose.model('User', userSchema);
export const buildUser = (data: IUser) => {
    return new UserModel(data);
}