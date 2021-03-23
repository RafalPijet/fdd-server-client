import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { controller } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { MessageModel, OutSideMessageModel, IUser, IMessage, IOutsideMessage } from '../models';
import { TargetOptions, IAdminMessage } from '../types';

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
}
