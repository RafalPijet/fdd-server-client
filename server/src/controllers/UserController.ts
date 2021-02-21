import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post } from '../routes';
import HttpException from '../exceptions/HttpException';
import { buildUser, IUser } from '../models';
import { ValidatorKeys, bodyValidator } from './decorators';

@controller('/api/users')
class UserController {
    @post('/user')
    @bodyValidator(ValidatorKeys.addUser)
    async postAddUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const user: IUser = req.body;
            const newUser = buildUser(user);
            await newUser.save();
            res.status(201).json({ message: "User has been added.", user: user })
        } catch (err) {
            next(new HttpException(404, `User hasn't been added!. - ${err.toString().includes('E11000') ?
                'This email already exists in the database' : err}`))
        }
    }
}