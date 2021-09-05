import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
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
    ChildModel,
    InvoiceModel,
    INews,
    NewsModel,
    buildNews,
    IReport,
    ReportModel,
    buildReport
} from '../models';
import { TargetOptions, IAdminMessage, SearchUserType } from '../types';
import { removeDuplicates, clearImage } from '../utils/functions';
import { io } from '../index';
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
        let quantity: number | undefined = undefined;

        try {
            if (type === SearchUserType.child) {
                person = await ChildModel.findById(id).populate('parent');
                quantity = await InvoiceModel.find({ childId: id }).countDocuments();
                const invoices = await InvoiceModel.find({ childId: id })
                    .sort({ createdAt: -1 })
                    .limit(8);
                person.invoices = invoices;
                person.parent.password = undefined;
            } else if (type === SearchUserType.parent || type === SearchUserType.admin) {
                person = await UserModel.findById(id).populate('children');
                person.password = undefined;
            } else {
                next(new HttpException(404, 'Błędny typ użytkownika'));
            }
            res.status(200).json({ person, quantity });
        } catch (err) {
            next(new HttpException(404,
                `Znalezienie osoby nie powiodło się. - ${err}`))
        }
    }
    @get('/child/invoices/:childId')
    async getChildInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { childId } = req.params;
            const { page, rowsPerPage } = req.query;
            const quantity = await InvoiceModel.find({ childId }).countDocuments();
            if (page !== undefined && rowsPerPage !== undefined && childId !== undefined) {
                const invoices = await InvoiceModel.find({ childId })
                    .sort({ createdAt: -1 })
                    .skip(+page * +rowsPerPage)
                    .limit(+rowsPerPage);
                res.status(200).json({ invoices, quantity });
            } else {
                next(new HttpException(404,
                    `Brak wszystkich parametrów zapytania.`))
            }
        } catch (err) {
            next(new HttpException(404,
                `Znalezienie listy faktur nie powiodło się. - ${err}`))
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
    @post('/news')
    @bodyValidator(ValidatorKeys.addNews)
    async addNews(req: Request, res: Response, next: NextFunction): Promise<void> {
        const payload = req.body;

        try {
            const newsQuantity = await NewsModel.find().countDocuments();
            if (newsQuantity >= 5) {
                next(new HttpException(404, 'Ilość artukułów nie może przekroczyć 5!'));
            } else {
                const currentNews: INews = {
                    publication: payload.isPublication,
                    title: payload.title,
                    content: payload.content,
                    images: payload.images
                }
                const newNews = buildNews(currentNews);
                await newNews.save();
                res.status(201).json({ newNews, message: "Nowy artukuł wiadomości został dodany." })
            }

        } catch (err) {
            next(new HttpException(404, 'Nieudane utworzenie artykułu wiadomości!'));
        }
    }

    @post('/news/picture/:newsId')
    async addPictureToNews(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { newsId } = req.params;
        const pictures = 'pictures';
        if (!req.files) {
            next(new HttpException(404, 'Brak obrazu'));
        } else {

            try {
                const currentNews = await NewsModel.findById(newsId);
                if (currentNews) {
                    if (currentNews.images && currentNews.images.length >= 5) {
                        next(new HttpException(404, 'Przekroczony limit ilości zdjęć'));
                    } else {
                        const files = req.files as Express.Multer.File[];
                        const pictureUrl = files[0].path.replace(files[0].destination, pictures);
                        const source = files[0].path.replace('uploads', pictures)  //It's will be remove
                        const target = source.replace(pictures, 'build/pictures')  //It's will be remove
                        await sharp(files[0].path)
                            .resize(833, 553)
                            .jpeg({ quality: 90 })
                            .toFile(path.resolve(pictures, files[0].filename))
                        fs.unlinkSync(files[0].path);
                        fs.copyFile(source, target, (err) => {              //It's will be remove
                            console.log(err)                                //It's will be remove
                        })                                                  //It's will be remove
                        currentNews.images = [...currentNews.images, pictureUrl];
                        await currentNews.save();
                        res.status(201).json(
                            {
                                message: `Dodano zdjęcia dla artukułu ${currentNews.title}`,
                                images: currentNews.images
                            });
                    }
                } else {
                    next(new HttpException(404, 'Nieudane dodanie zdjęcia. Nie znaleziono artukułu.'));
                }

            } catch (err) {
                next(new HttpException(404, 'Nieudane dodanie zdjęcia do artykułu'));
            }
        }
    }

    @put('/news/pictures')
    async updatePicturesList(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { contentList, removeList, id } = req.body;

        try {
            const news = await NewsModel.findById(id);
            if (!news) {
                next(new HttpException(404, "Nie znaleziono artykułu"))
            } else {
                news.images = contentList;
                if (removeList.length) {
                    removeList.forEach((item: string) => {
                        clearImage(item)
                    })
                }
                await news.save();
                res.status(201).json({ message: `Dokonano zmian na liście zdjęć artukułu: "${news.title}"` });
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana zmiana listy zdjęć'));
        }
    }

    @put('/news/publication')
    async updateNewsPublication(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { newsId, isPublication } = req.body;

        try {
            const currentNews = await NewsModel.findById(newsId);
            if (!currentNews) {
                next(new HttpException(404, "Nie znaleziono artykułu"));
            } else {
                currentNews.publication = isPublication;
                currentNews.save();
                io.emit('change');
                res.status(201).json({ message: `Artukuł "${currentNews.title}" ${isPublication ? "jest" : "nie jest"} publikowany.` })
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana zmiana listy zdjęć'));
        }
    }

    @put('/news/data')
    @bodyValidator(ValidatorKeys.addNews)
    async updateNewsData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { newsId, title, content } = req.body;

        try {
            const currentNews = await NewsModel.findById(newsId);
            if (!currentNews) {
                next(new HttpException(404, "Nie znaleziono artykułu"));
            } else {
                if (title !== undefined) {
                    currentNews.title = title;
                }
                if (content !== undefined) {
                    currentNews.content = content;
                }
                await currentNews.save();
                res.status(201).json({ message: `Aktualizacja powiodła się: ${title !== undefined ? "zmiana tytułu" : ""}; ${content !== undefined ? "zmiana treści" : ""}` })
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana aktualizacja danych artykułu'));
        }
    }

    @del('/news')
    async removeCurrentNews(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { newsId, images } = req.body

        try {
            await NewsModel.findByIdAndDelete(newsId);
            if (images.length) {
                images.forEach((item: string) => {
                    clearImage(item)
                })
            }
            io.emit('change');
            res.status(202).json({ message: 'Artukuł został usunięty' });
        } catch (err) {
            next(new HttpException(404, 'Nieudane usunięcie artykułu'));
        }
    }

    @post('/reports')
    async addReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title } = req.body;
        const reports = 'reports'
        if (!req.files.length) {
            next(new HttpException(404, 'Brak pliku ze sprawozdaniem'));
        } else {
            try {
                const files = req.files as Express.Multer.File[];
                const fileUrl = files[0].path.replace(files[0].destination, reports);
                const report = buildReport({
                    report: fileUrl,
                    title
                });
                const newReport: IReport = await report.save();
                const source = files[0].path.replace('uploads', reports);  //It's will be remove
                const target = source.replace(reports, 'build/reports');  //It's will be remove
                await fs.copyFile(files[0].path, source, (err) => {
                    console.log(err)
                })
                await fs.copyFile(files[0].path, target, (err) => {  //It's will be remove
                    console.log(err)                    //It's will be remove
                })
                fs.unlinkSync(files[0].path);
                io.emit('change');
                res.status(201).json({ message: 'Dodanie sprawozdania zakończone sukcesem', newReport });
            } catch (err) {
                next(new HttpException(404, 'Nieudane dodanie sprawozdania'));
            }
        }
    }

    @put('/reports/:id')
    async updateReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const { title } = req.body;

        try {
            const report = await ReportModel.findById(id);
            if (!report) {
                next(new HttpException(404, 'Nie znaleziono sprawozdania'));
            } else {
                if (title !== undefined) {
                    report.title = title;
                    await report.save();
                }
                if (req.files.length) {
                    const files = req.files as Express.Multer.File[];
                    const reports = 'reports'
                    const urlToRemove = report.report;
                    const fileUrl = files[0].path.replace(files[0].destination, reports);
                    report.report = fileUrl;
                    await report.save();
                    const source = files[0].path.replace('uploads', reports);  //It's will be remove
                    const target = source.replace(reports, 'build/reports');  //It's will be remove
                    await fs.copyFile(files[0].path, source, (err) => {
                        console.log(err)
                    })
                    await fs.copyFile(files[0].path, target, (err) => {  //It's will be remove
                        console.log(err)                    //It's will be remove
                    })
                    fs.unlinkSync(files[0].path);
                    clearImage(urlToRemove);
                }
                res.status(201).json({ message: `Aktualizacja sprawozdania ${report.title} przebiegła poprawnie`, report });
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana aktualizacja sprawozdania'));
        }
    }

    @del('/reports/:id')
    async removeReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const removedReport = await ReportModel.findByIdAndDelete(id);
            if (removedReport !== null) {
                clearImage(removedReport.report);
                io.emit('change');
                res.status(201).json({ message: `Sprawozdanie ${removedReport.title} zostało usunięte.` })
            } else {
                next(new HttpException(404, 'Nie znaleziono sprawozdania!'));
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudane usunięcie sprawozdania'));
        }
    }

    @put('/child/status')
    async updateChildStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id, isActive } = req.body;

        try {
            let findedChild = await ChildModel.findById({ _id });
            if (!findedChild) {
                next(new HttpException(404, 'Nie znaleziono podopiecznego'));
            } else {
                findedChild.active = isActive;
                await findedChild.save();
                io.emit('change');
                io.emit('update', { action: 'childStatus', parentId: findedChild.parent, childId: _id, isActive });
                res.status(201).send();
            }
        } catch (err) {
            next(new HttpException(404, 'Aktualizacja statusu podopiecznego nieudana!'));
        }
    }

    @del('/child/:_id')
    async removeChild(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id } = req.params;

        try {
            const removedChild = await ChildModel.findByIdAndDelete(_id);
            if (!removedChild) {
                next(new HttpException(404, 'Nie znaleziono podopiecznego.'));
            } else {
                if (removedChild.avatar) {
                    clearImage(removedChild.avatar)
                }
                if (removedChild.images && removedChild.images.length) {
                    removedChild.images.forEach((item: string) => {
                        clearImage(item);
                    })
                }
                const parentOfRemovedChild = await UserModel.findById(removedChild.parent);
                if (parentOfRemovedChild && parentOfRemovedChild.children && parentOfRemovedChild.children.length) {
                    parentOfRemovedChild.children = parentOfRemovedChild.children.filter((item) => item.toString() !== removedChild._id.toString()
                    );
                    await parentOfRemovedChild.save();
                }
                io.emit('change');
                res.status(201).json({ message: `Podopieczny ${removedChild.firstName} ${removedChild.lastName} został bezpowrotnie usunięty!` })
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudane usunięcie podopiecznego.'));
        }
    }

    @del('/user/:_id')
    async removeUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { _id } = req.params;

        try {
            const removedUser = await UserModel.findByIdAndDelete(_id);
            if (!removedUser) {
                next(new HttpException(404, 'Nie znaleziono rodzica.'));
            } else {
                await MessageModel.deleteMany({ $or: [{ to: _id }, { from: _id }] });
                io.emit('change');
                res.status(201).json({ message: `Rodzic ${removedUser.firstName} ${removedUser.lastName} został usunięty.` })
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudane usunięcie podopiecznego.'));
        }
    }

    @get('/reports')
    async getReportsData(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            let unpublicatedChildren;
            let parentsWithoutChildren;
            const parentsQuantity = await UserModel.find({ status: UserStatus.parent }).countDocuments();
            const childrenQuantity = await ChildModel.find().countDocuments();
            const publicatedNewsQuantity = await NewsModel.find({ publication: true }).countDocuments();
            const invoicesQuantity = await InvoiceModel.find().countDocuments();
            const currentYear = new Date().getFullYear();
            const result = await ReportModel.find({
                createdAt: {
                    $gte: new Date(currentYear, 1, 1),
                    $lte: new Date(currentYear, 12, 31)
                }
            })
            const unpublicatedChildrenResult = await ChildModel.find({ active: false });
            if (unpublicatedChildrenResult) {
                unpublicatedChildren = unpublicatedChildrenResult.map((child) => {
                    return {
                        _id: child._id,
                        name: `${child.firstName} ${child.lastName}`
                    }
                })
            }
            const parentsWithoutChildrenResult = await UserModel.find({ status: UserStatus.parent, children: { $exists: true, $size: 0 } });
            if (parentsWithoutChildrenResult) {
                parentsWithoutChildren = parentsWithoutChildrenResult.map((parent) => {
                    return {
                        _id: parent._id,
                        name: `${parent.firstName} ${parent.lastName}`
                    }
                })
            }
            res.status(200).json({
                parentsQuantity,
                childrenQuantity,
                publicatedNewsQuantity,
                invoicesQuantity,
                isReportDone: result && result.length ? true : false,
                unpublicatedChildren,
                parentsWithoutChildren
            });
        } catch (err) {
            next(new HttpException(404, 'Nieudane popranie danych raportów.'));
        }
    }
}