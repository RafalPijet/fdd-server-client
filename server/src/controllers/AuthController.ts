import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { createToken, createCookie } from './token.service';
import { post } from '../routes';
import { UserModel, IUser, buildUser } from '../models';
import HttpException from '../exceptions/HttpException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialException';

@controller('/auth')
class AuthController {
    @post('/login')
    @bodyValidator(ValidatorKeys.login)
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if (user && user.password) {

                if (await bcrypt.compare(password, user.password)) {
                    user.password = undefined;
                    const tokenData = createToken(user);
                    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
                    res.status(201).json({ user })
                } else {
                    next(new WrongCredentialsException('password'));
                }
            } else {
                next(new WrongCredentialsException('email'));
            }
        } catch (err) {
            next(new HttpException(404, `User not found. - ${err}`))
        }
    }

    @post('/user')
    @bodyValidator(ValidatorKeys.addUser)
    async postAddUser(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const user: IUser = req.body;

            if (await UserModel.findOne({ email: user.email })) {
                next(new UserWithThatEmailAlreadyExistsException(user.email));
            } else {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
                const newUser = buildUser(user);
                await newUser.save();
                newUser.password = undefined;
                res.status(201).json({ message: "User has been added.", user: newUser })
            }
        } catch (err) {
            next(new HttpException(404, `User hasn't been added!. - ${err}`))
        }
    }
}