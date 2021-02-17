import { Request, Response, NextFunction } from 'express';
import { controller } from './decorators';
import { post } from '../routes';
import { buildUser, IUser } from '../models';

@controller('/auth')
class LoginController {
    @post('/login')
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const user: IUser = req.body;
            const newUser = buildUser(user);
            await newUser.save();
            res.status(201).json({ message: "Response has been done.", user: user })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}