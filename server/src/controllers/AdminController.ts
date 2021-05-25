import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { controller } from './decorators';
import { post, get, put, del } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import * as dotenv from 'dotenv';
import {
    MessageModel,
    OutSideMessageModel,
    IUser,
    IMessage,
    IOutsideMessage,
    UserModel,
    UserStatus,
    ChildModel
} from '../models';
import { TargetOptions, IAdminMessage, SearchUserType } from '../types';
import { removeDuplicates } from '../utils/functions';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import nodemailer from 'nodemailer';
dotenv.config();
const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_KEY!
    })
);

@controller('/api/admin')
class AdminController {
    @get('/messages/:target/:start/:limit')
    async getAdminMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { target, start, limit } = req.params;
        const startValue = parseInt(start);
        const limitValue = parseInt(limit);
        let outSideMessages: (IOutsideMessage & mongoose.Document<any>)[] = [];
        let parentMessages: (IMessage & mongoose.Document<any>)[] = [];
        let mapOutSideMessages: IAdminMessage[] = [];
        let mapParentMessages: IAdminMessage[] = [];

        try {
            if (target !== TargetOptions.all) {
                (target === TargetOptions.to) ? outSideMessages = await OutSideMessageModel.find() : outSideMessages = await OutSideMessageModel.find({ "answer": { "$gte": " " } });
                parentMessages = await MessageModel.find({ [target]: request.user._id }).populate(target === TargetOptions.from ? TargetOptions.to : TargetOptions.from);
                mapParentMessages = parentMessages.map((item: (IMessage & mongoose.Document<any>)) => {
                    return {
                        _id: item._id,
                        isUser: true,
                        content: item.content,
                        from: target === TargetOptions.from ? item.from! : (<IUser><unknown>item.from)._id!,
                        userName: `${(<IUser><unknown>item[target === TargetOptions.to ?
                            TargetOptions.from :
                            TargetOptions.to]).firstName} ${(<IUser><unknown>item[target === TargetOptions.to ?
                                TargetOptions.from :
                                TargetOptions.to]).lastName}`,
                        userEmail: (<IUser><unknown>item[target === TargetOptions.to ? TargetOptions.from : TargetOptions.to]).email,
                        new: item.new!,
                        to: target === TargetOptions.to ? item.to! : (<IUser><unknown>item.to)._id!,
                        created: item.created!,
                        answer: undefined
                    }
                })
            } else {
                outSideMessages = await OutSideMessageModel.find();
                parentMessages = await MessageModel.find().populate([TargetOptions.from, TargetOptions.to]);
                mapParentMessages = parentMessages.map((item: (IMessage & mongoose.Document<any>)) => {
                    let userName = '';
                    let userEmail = '';

                    if ((<IUser><unknown>item.from)._id?.toString() === request.user._id?.toString()) {
                        userName = `${(<IUser><unknown>item.to).firstName} ${(<IUser><unknown>item.to).lastName}`
                        userEmail = (<IUser><unknown>item.to).email
                    } else {
                        userName = `${(<IUser><unknown>item.from).firstName} ${(<IUser><unknown>item.from).lastName}`
                        userEmail = (<IUser><unknown>item.from).email
                    }
                    return {
                        _id: item._id,
                        isUser: true,
                        content: item.content,
                        from: (<IUser><unknown>item.from)._id!,
                        userName,
                        userEmail,
                        new: item.new!,
                        to: (<IUser><unknown>item.to)._id!,
                        created: item.created!,
                        answer: undefined
                    }
                })
            }
            mapOutSideMessages = outSideMessages.map((item: (IOutsideMessage & mongoose.Document<any>)) => {
                return {
                    _id: item._id,
                    isUser: false,
                    content: (item.answer && item.answer.length > 0) ? `${item.content} [ODPOWIEDŹ]: ${item.answer}` : item.content,
                    userName: item.name,
                    userEmail: item.email,
                    new: item.new!,
                    to: request.user._id!,
                    created: item.created!,
                    answer: item.answer!,
                    from: undefined
                }
            })
            const combineMessages = [...mapOutSideMessages, ...mapParentMessages];
            const messagesAfterSorted = combineMessages.sort((a: IAdminMessage, b: IAdminMessage) => {
                return +new Date(b.created) - +new Date(a.created)
            })
            let messages = messagesAfterSorted.slice(startValue, startValue + limitValue)
            res.status(200).json({ messages, quantity: messagesAfterSorted.length });
        } catch (err) {
            next(new HttpException(404,
                `Nie znaleziono wiadomości od ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }
    @get('/messages/user/:isparent/:user/:start/:limit')
    async getAdminMessagesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { isparent, user, start, limit } = req.params;
        const isParent = JSON.parse(isparent);
        const startValue = parseInt(start);
        const limitValue = parseInt(limit);

        try {
            if (isParent) {
                const messages = await MessageModel.find({ $or: [{ to: user }, { from: user }] })
                    .sort({ created: 'desc' }).exec();
                const messagesWithUserInfo = messages.map((item: IMessage) => {
                    return {
                        isUser: true,
                        _id: item._id,
                        new: item.new,
                        content: item.content,
                        from: item.from,
                        to: item.to,
                        created: item.created
                    }
                })
                let messagesToSend = messagesWithUserInfo.slice(startValue, startValue + limitValue);
                res.status(200).json({ messages: messagesToSend, quantity: messages.length });
            } else {
                const messages = await OutSideMessageModel.find({ email: user })
                    .sort({ created: 'desc' }).exec();
                let messagesWithUserInfo = messages.map((item: IOutsideMessage) => {
                    if (item.answer && item.answer.length > 0) {
                        item.content = `${item.content} [ODPOWIEDŹ]: ${item.answer}`
                    }

                    return {
                        isUser: false,
                        _id: item._id,
                        new: item.new,
                        answer: item.answer,
                        name: item.name,
                        email: item.email,
                        content: item.content,
                        created: item.created
                    };
                })
                let messagesToSend = messagesWithUserInfo.slice(startValue, startValue + limitValue);
                res.status(200).json({ messages: messagesToSend, quantity: messages.length });
            }
        } catch (err) {
            next(new HttpException(404,
                `Nie znaleziono wiadomości od ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }

    @get('/names/:isparent')
    async getUsersNames(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { isparent } = req.params;
        const isParent = JSON.parse(isparent);
        let names = [];
        try {
            if (isParent) {
                const items = await UserModel.find({ status: UserStatus.parent });
                names = items.map((item: IUser) => {
                    return {
                        _id: item._id,
                        name: `${item.firstName} ${item.lastName}`
                    }
                })
            } else {
                const items = await OutSideMessageModel.find();
                const temp = items.map((item: IOutsideMessage) => {
                    return {
                        name: item.name,
                        email: item.email
                    }
                })
                names = removeDuplicates(temp, (item: any) => item.email);
            }
            res.status(200).json({ names });
        } catch (err) {
            next(new HttpException(404,
                `Brak dostępnych danych. - ${err}`))
        }
    }
    @get('/people/names/:type')
    async getPeopleNames(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { type } = req.params;
        let names: any[] = [];

        try {
            if (type === SearchUserType.child) {
                const children = await ChildModel.find();
                names = children.map((child) => {
                    return {
                        _id: child._id,
                        name: `${child.firstName} ${child.lastName}`
                    }
                })

            } else if (type === SearchUserType.parent) {
                const parents = await UserModel.find({ status: UserStatus.parent });
                names = parents.map((parent => {
                    return {
                        _id: parent._id,
                        name: `${parent.firstName} ${parent.lastName}`
                    }
                }))
            } else if (type === SearchUserType.admin) {
                const admins = await UserModel.find({ status: UserStatus.admin });
                names = admins.map((admin) => {
                    return {
                        _id: admin._id,
                        name: `${admin.firstName} ${admin.lastName}`
                    }
                })
            } else {
                next(new HttpException(404, 'Błędny typ użytkownika'));
            }
            res.status(200).json({ names });
        } catch (err) {
            next(new HttpException(404,
                `Brak dostępnych danych. - ${err}`))
        }
    }

    @get('/people/:type/:id')
    async getPersonByTypeAndId(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { type, id } = req.params
        let person: any;

        try {
            if (type === SearchUserType.child) {
                person = await ChildModel.findById(id).populate('parent').populate('invoices');
                person.parent.password = undefined;
            } else if (type === SearchUserType.parent || type === SearchUserType.admin) {
                person = await UserModel.findById(id).populate('children');
                person.password = undefined;
            } else {
                next(new HttpException(404, 'Błędny typ użytkownika'));
            }
            res.status(200).json({ person });
        } catch (err) {
            next(new HttpException(404,
                `Znalezienie osoby nie powiodło się. - ${err}`))
        }
    }

    @del('/messages')
    async removeMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { messageId, isUser } = req.body;

        try {
            if (isUser) {
                await MessageModel.findByIdAndDelete(messageId);
            } else {
                await OutSideMessageModel.findByIdAndDelete(messageId);
            }
            res.status(201).send({ message: 'Wiadomość została usunięta.' })
        } catch (err) {
            next(new HttpException(404,
                `Usunięcie wiadomości nie powiodło się. - ${err}`))
        }
    }
    @put('/messages/update/answer')
    async updateAnswerOutsideMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { messageId, content, email, name } = req.body;
        const request = req as RequestWithUser;

        try {
            let message: (IOutsideMessage & mongoose.Document<any>) | null = await OutSideMessageModel.findById(messageId);
            if (message !== null) {
                const existAnswer = message.answer;
                if (existAnswer !== undefined) {
                    message.answer = `${existAnswer} [${new Date().toLocaleDateString()}]: ${content}`;
                } else {
                    message.answer = `[${new Date().toLocaleDateString()}]: ${content}`
                }
                await message.save();
                transporter.sendMail({
                    to: email,
                    from: process.env.FDD_Email,
                    subject: 'Odpowiedź z Fundacji Dorośli Dzieciom',
                    html: `
                    <h2>Fundacja DOROŚLI DZIECIOM</h2>
                    <h3>Dzień dobry ${name}</h3>
                    <p>${content}</p>
                    <p>Pozdrawiam ${request.user.firstName} ${request.user.lastName}</p>
                `
                });
                res.status(201).send();
            }
        } catch (err) {
            next(new HttpException(404,
                `Aktualizacja wiadomości nie powiodło się. - ${err}`))
        }
    }
    @post('/messages/email')
    async sendEmailToSelectedOutsideUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { content, email, name } = req.body;
        const request = req as RequestWithUser;

        try {
            transporter.sendMail({
                to: email,
                from: process.env.FDD_Email,
                subject: 'Fundacja Dorośli Dzieciom',
                html: `
                <h2>Fundacja DOROŚLI DZIECIOM</h2>
                <h3>Dzień dobry ${name}</h3>
                <p>${content}</p>
                <p>Pozdrawiam ${request.user.firstName} ${request.user.lastName}</p>
            `
            });
            res.status(201).json({ message: `Wiadomość do ${name} na adres ${email} została wysłana.` });
        } catch (err) {
            next(new HttpException(404,
                `Wysłanie wiadomości email ${email} do ${name} nie powiodło się. - ${err}`))
        }
    }

    @put('/user/status/:userId')
    async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const { status } = req.body;

        try {
            const user = await UserModel.findById(userId);
            if (user) {
                user.status = status;
                await user.save();
                res.status(201).json({ message: `Status użytkownika ${user.firstName} ${user.lastName} został zmieniony na ${status}` })
            } else {
                next(new HttpException(404, 'Nie znaleziono użytkownika'))
            }
        } catch (err) {
            next(new HttpException(404, `Zmiana status użytkownika nie powiodła się`))
        }
    }
}
