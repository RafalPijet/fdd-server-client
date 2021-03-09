import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { buildUser, IUser, UserModel, IMessage, buildMessage } from '../models';
import { ValidatorKeys, bodyValidator } from './decorators';

@controller('/api/users')
class UserController {
    @put('/message')
    async addMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;

        try {
            const message: IMessage = request.body;

            const newMessage = buildMessage(message);
            await newMessage.save();
            res.status(201).json({ message: "Wiadomość została wysłana." })
        } catch (err) {
            next(new HttpException(404, `Wiadomość nie została wysłana. - ${err}`))
        }
    }

    @get('/parents')
    async getAllParents(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;

        try {
            res.status(200).send(request.user)
        } catch (err) {
            next(new HttpException(404, `Parents not found. - ${err}`))
        }
    }
}