import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { IMessage, buildMessage, MessageModel, OutSideMessageModel } from '../models';

@controller('/api/users')
class UserController {
    @post('/message')
    async addMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;

        try {
            const content = request.body.content;
            const userId = request.body.userId;
            const message: IMessage = {
                content,
                from: request.user._id,
                to: userId !== undefined ? userId : process.env.ADMIN_ID
            };
            const newMessage = buildMessage(message);
            await newMessage.save();
            res.status(201).json({ message: "Wiadomość została wysłana." })
        } catch (err) {
            next(new HttpException(404, `Wiadomość nie została wysłana. - ${err}`))
        }
    }

    @get('/messages/:target/:start/:limit')
    async getUserMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { target, start, limit } = req.params;
        const startValue = parseInt(start);
        const limitValue = parseInt(limit);

        try {
            const messages = await MessageModel.find(target !== 'all' ?
                { [target]: request.user._id } :
                { $or: [{ to: request.user._id }, { from: request.user._id }] })
                .sort({ created: 'desc' }).exec();
            let messagesToSend = messages.slice(startValue, startValue + limitValue);
            res.status(200).json({ messages: messagesToSend, quantity: messages.length });

        } catch (err) {
            next(new HttpException(404,
                `Nie znaleziono wiadomości od ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }

    @put('/messages/readed')
    async updateUserMessageIsReaded(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { _id, isAdmin, isUser } = req.body;

        try {
            if (isAdmin) {
                if (isUser) {
                    await MessageModel.findByIdAndUpdate(_id, { "new": false });
                } else {
                    await OutSideMessageModel.findByIdAndUpdate(_id, { "new": false });
                }
            } else {
                await MessageModel.findByIdAndUpdate(_id, { "new": false });
            }
            res.status(202).send();
        } catch (err) {
            next(new HttpException(404,
                `Niepowodzenie aktualizacji wiadomości dla ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }
}
