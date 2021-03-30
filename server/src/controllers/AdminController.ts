import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { controller } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import {
    MessageModel,
    OutSideMessageModel,
    IUser,
    IMessage,
    IOutsideMessage,
    UserModel,
    UserStatus
} from '../models';
import { TargetOptions, IAdminMessage } from '../types';
import { removeDuplicates } from '../utils/functions';

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
                outSideMessages = await OutSideMessageModel.find(target === TargetOptions.to ? { "answer": "" } : { "answer": { "$gte": " " } });
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
                    content: item.content,
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
                let messagesToSend = messages.slice(startValue, startValue + limitValue);
                res.status(200).json({ messages: messagesToSend, quantity: messages.length });
            } else {
                const messages = await OutSideMessageModel.find({ email: user })
                    .sort({ created: 'desc' }).exec();
                let messagesToSend = messages.map((item: IOutsideMessage) => {
                    if (item.answer && item.answer.length > 0) {
                        item.content = `${item.content} [ODPOWIEDŹ]: ${item.answer}`
                    }
                    return item;
                })
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
}
