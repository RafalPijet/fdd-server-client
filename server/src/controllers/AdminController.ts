import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { MessageModel, OutSideMessageModel } from '../models';

@controller('/api/admin')
class AdminController {
    @get('/messages/:target/:start/:limit')
    async getAdminMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { target, start, limit } = req.params;
        const startValue = parseInt(start);
        const limitValue = parseInt(limit);

        try {
            if (target !== 'from') {
                const outSideMessages = await OutSideMessageModel.find();
            } else {
                const messages = await MessageModel.find({ from: request.user._id })
            }
        } catch (err) {
            next(new HttpException(404,
                `Nie znaleziono wiadomości od ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }
}
