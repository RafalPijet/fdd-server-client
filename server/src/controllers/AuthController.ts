import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { createToken } from './token.service';
import { post } from '../routes';
import { UserModel, IUser, buildUser, IOutsideMessage, buildOutSideMessage } from '../models';
import HttpException from '../exceptions/HttpException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialException';

@controller('/api/auth')
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
                    user._id = "";
                    const tokenData = createToken(user);
                    const dto = {
                        _id: user.id,
                        status: user.status,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        children: user.children,
                        adress: {
                            zipCode: user.zipCode,
                            town: user.town,
                            street: user.street,
                            number: user.number
                        }
                    }
                    res.status(201).json({ dto, authorization: tokenData })
                } else {
                    next(new WrongCredentialsException('hasło'));
                }
            } else {
                next(new WrongCredentialsException('adres email'));
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
                res.status(201).send();
            }
        } catch (err) {
            next(new HttpException(404, `Rodzic nie został dodany!. - ${err}`))
        }
    }

    @post('/message')
    @bodyValidator(ValidatorKeys.addMessage)
    async addMessage(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const payload = req.body;
            const message: IOutsideMessage = {
                name: payload.name,
                email: payload.email,
                content: payload.content
            }
            const newMessage = buildOutSideMessage(message);
            await newMessage.save();
            res.status(201).json({ message: "Wiadomość została wysłana." });
        } catch (err) {
            next(new HttpException(404, `Wiadomość nie została wysłana!. - ${err}`))
        }
    }
}