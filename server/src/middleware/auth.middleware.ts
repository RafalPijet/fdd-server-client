import { NextFunction, Response, Request, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import { DataStoredInToken } from '../controllers/token.service';
import { IUser, UserModel } from '../models/userModel';

export interface RequestWithUser extends Request {
    user: IUser;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const request = req as RequestWithUser;
    const headers = req.headers;

    if (headers.authorization) {
        const secret = process.env.SECRET_KEY;
        try {
            const verificationResponse = jwt.verify(headers.authorization, secret!) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await UserModel.findById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}
