import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { post } from '../routes';
import HttpException from '../exceptions/HttpException';
import { UserModel } from '../models';

@controller('/auth')
class LoginController {
    @post('/login')
    @bodyValidator(ValidatorKeys.login)
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            // await UserModel.findById('');
            res.status(201).json({ message: "Response has been done." })
        } catch (err) {
            next(new HttpException(404, `User not found. - ${err}`))
        }
    }
}