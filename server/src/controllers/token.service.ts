import jwt from 'jsonwebtoken';
import { IUser } from '../models';

interface TokenData {
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    _id: string;
}

export const createToken = (user: IUser, expiresIn: number): TokenData => {
    const secret = process.env.SECRET_KEY;
    const dataStoredInToken: DataStoredInToken = {
        _id: user._id!,
    };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret!, { expiresIn }),
    };
}