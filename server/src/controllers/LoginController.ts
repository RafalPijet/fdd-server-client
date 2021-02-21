import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { post } from '../routes';
import HttpException from '../exceptions/HttpException';

@controller('/auth')
class LoginController {
    @post('/login')
    @bodyValidator(ValidatorKeys.login)
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            res.status(201).json({ message: "Response has been done." })
        } catch (err) {
            next(new HttpException(404, `User not found. - ${err}`))
        }
    }
}