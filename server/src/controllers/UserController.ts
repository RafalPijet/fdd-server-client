import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post, get } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { buildUser, IUser, UserModel } from '../models';
import { ValidatorKeys, bodyValidator } from './decorators';

@controller('/api/users')
class UserController {
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