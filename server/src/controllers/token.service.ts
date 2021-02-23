import jwt from 'jsonwebtoken';
import { IUser } from '../models';

interface TokenData {
    token: string;
    expiresIn: number;
}

export interface DataStoredInToken {
    _id: string;
}

export const createToken = (user: IUser): TokenData => {
    const expiresIn = 3600;
    const secret = process.env.SECRET_KEY;
    const dataStoredInToken: DataStoredInToken = {
        _id: user._id!,
    };
    return {
        expiresIn,
        token: jwt.sign(dataStoredInToken, secret!, { expiresIn }),
    };
}

export const createCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}