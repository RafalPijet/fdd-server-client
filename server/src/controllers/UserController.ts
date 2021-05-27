import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import {
    IMessage,
    buildMessage,
    MessageModel,
    OutSideMessageModel,
    ChildModel,
    IChild,
    buildChild,
    IUser,
    UserModel,
    IInvoice,
    buildInvoice
} from '../models';
import { clearImage, UserDto } from '../utils/functions';

@controller('/api/users')
class UserController {
    @post('/message')
    async addMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;

        try {
            const content = request.body.content;
            const userId = request.body.userId;
            const message: IMessage = {
                content,
                from: request.user._id,
                to: userId !== undefined ? userId : process.env.ADMIN_ID
            };
            const newMessage = buildMessage(message);
            await newMessage.save();
            res.status(201).json({ message: "Wiadomość została wysłana." })
        } catch (err) {
            next(new HttpException(404, `Wiadomość nie została wysłana. - ${err}`))
        }
    }

    @get('/messages/:target/:start/:limit')
    async getUserMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { target, start, limit } = req.params;
        const startValue = parseInt(start);
        const limitValue = parseInt(limit);

        try {
            const messages = await MessageModel.find(target !== 'all' ?
                { [target]: request.user._id } :
                { $or: [{ to: request.user._id }, { from: request.user._id }] })
                .sort({ created: 'desc' }).exec();
            let messagesToSend = messages.slice(startValue, startValue + limitValue);
            res.status(200).json({ messages: messagesToSend, quantity: messages.length });

        } catch (err) {
            next(new HttpException(404,
                `Nie znaleziono wiadomości od ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }

    @put('/messages/readed')
    async updateUserMessageIsReaded(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { _id, isAdmin, isUser } = req.body;

        try {
            if (isAdmin) {
                if (isUser) {
                    await MessageModel.findByIdAndUpdate(_id, { "new": false });
                } else {
                    await OutSideMessageModel.findByIdAndUpdate(_id, { "new": false });
                }
            } else {
                await MessageModel.findByIdAndUpdate(_id, { "new": false });
            }
            res.status(202).send();
        } catch (err) {
            next(new HttpException(404,
                `Niepowodzenie aktualizacji wiadomości dla ${request.user.firstName} ${request.user.lastName}. - ${err}`))
        }
    }

    @post('/child/invoice/add/:childId')
    async addInvoiceToChild(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { childId } = req.params;
        const { description } = req.body;
        const invoices = 'invoices';
        if (!req.files) {
            next(new HttpException(404, 'Brak skanu faktury'));
        } else {
            try {
                const foundChild = await ChildModel.findById(childId).populate('invoices');
                if (foundChild) {
                    const files = req.files as Express.Multer.File[];
                    let imagesUrl: string[] = [];
                    let filesToRemove: string[] = [];
                    files.forEach(async (file: Express.Multer.File) => {
                        const imageUrl = file.path.replace(file.destination, invoices);
                        imagesUrl.push(imageUrl);
                        const source = file.path.replace('uploads', invoices);  //It's will be remove
                        const target = source.replace(invoices, 'build/invoices');  //It's will be remove
                        await fs.copyFile(file.path, source, (err) => {
                            console.log(err)
                        })
                        await fs.copyFile(file.path, target, (err) => {  //It's will be remove
                            console.log(err)                    //It's will be remove
                        })                                      //It's will be remove
                        filesToRemove.push(file.path)
                    })
                    const invoice: IInvoice = {
                        childId: foundChild.id,
                        description,
                        content: imagesUrl
                    }
                    const newInvoice = buildInvoice(invoice);
                    await newInvoice.save();
                    foundChild.invoices?.push(newInvoice);
                    await foundChild.save();
                    filesToRemove.forEach(item => {
                        fs.unlinkSync(item);
                    })
                    res.status(201).json({ message: `Nowa faktura została dodana dla ${foundChild.firstName} ${foundChild.lastName}` });
                } else {
                    next(new HttpException(404, 'Nie znaleziono dziecka'));
                }

            } catch (err) {
                next(new HttpException(404, 'Nieudane dodanie faktury'));
            }
        }
    }

    @put('/child/images')
    async updateImagesList(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { contentList, removeList, id } = req.body;
        try {
            const child = await ChildModel.findById(id);
            if (!child) {
                next(new HttpException(404, "Nie znaleziono dziecka"))
            } else {
                child.images = contentList;
                if (removeList.length) {
                    removeList.forEach((item: string) => {
                        clearImage(item)
                    })
                }
                await child.save();
                res.status(200).json({ message: 'Dokonano zmian na liście zdjęć dziecka' });
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana zmiana listy zdjęć'));
        }
    }

    @post('/child/:userId')
    @bodyValidator(ValidatorKeys.addChild)
    async addChild(req: Request, res: Response, next: NextFunction): Promise<void> {
        const request = req as RequestWithUser;
        const { userId } = req.params;
        const payload = req.body;
        let user: any;

        try {
            if (userId !== 'undefined') {
                user = await UserModel.findById(userId);
            } else {
                user = await UserModel.findById(request.user._id);
            }
            const child: IChild = {
                parent: userId !== 'undefined' ? userId : request.user._id,
                firstName: payload.firstName,
                lastName: payload.lastName,
                birthDate: new Date(payload.birthDate),
                info: payload.info,
            }
            const newChild = buildChild(child);
            if (user !== null) {
                user.children?.push(newChild)
                await user.save();
            }
            await newChild.save();
            res.status(201).json({
                child: newChild,
                message: `Do rodzica ${user.firstName} ${user.lastName} został przyporządkowany podopieczny ${newChild.firstName} ${newChild.lastName}`
            });
        } catch (err) {
            next(new HttpException(404, 'Nieudane utworzenie podopiecznego!'));
        }
    }

    @put('/child/:childId')
    @bodyValidator(ValidatorKeys.addChild)
    async updateChild(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { childId } = req.params;
        const payload: Omit<IChild, 'parent'> = req.body;

        try {
            const child = await ChildModel.findById(childId);
            if (child) {
                child.firstName = payload.firstName;
                child.lastName = payload.lastName;
                child.birthDate = payload.birthDate;
                child.info = payload.info;
                await child.save();
                res.status(201).json({
                    child,
                    message: `Aktualizacja danych podopiecznego ${child.firstName} ${child.lastName} przebiegła poprawnie.`
                })
            } else {
                next(new HttpException(404, 'Nieznaleziono podopecznego!'));
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana akualizacja danych podopiecznego!'));
        }
    }

    @put('/child/avatar/:childId')
    async addChildAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { childId } = req.params;
        const avatars = 'avatars';
        if (!req.files) {
            next(new HttpException(404, 'Brak portretu'));
        } else {
            try {
                const files = req.files as Express.Multer.File[];
                const foundChild = await ChildModel.findById(childId);
                if (foundChild) {
                    const imageUrl = files[0].path.replace(files[0].destination, avatars)
                    const source = files[0].path.replace('uploads', avatars)   //It's will be remove
                    const target = source.replace(avatars, 'build/avatars')     //It's will be remove
                    await sharp(files[0].path)
                        .resize(120, 120)
                        .jpeg({ quality: 90 })
                        .toFile(path.resolve(avatars, files[0].filename))
                    fs.unlinkSync(files[0].path);
                    fs.copyFile(source, target, (err) => {              //It's will be remove
                        console.log(err)                                //It's will be remove
                    })                                                  //It's will be remove
                    if (foundChild.avatar && foundChild.avatar.length > 0) {
                        const oldAvatar = foundChild.avatar;
                        clearImage(oldAvatar)
                    }
                    foundChild.avatar = imageUrl;
                    await foundChild.save();
                    res.status(201).json(
                        {
                            message: `Ustawiono portet dla ${foundChild.firstName} ${foundChild.lastName}`,
                            avatar: foundChild.avatar
                        });
                } else {
                    next(new HttpException(404, 'Nieudane dodanie zdjęcia. Nie znaleziono dziecka.'));
                }
            } catch (err) {
                next(new HttpException(404, 'Nieudane dodanie portretu'));
            }
        }
    }

    @post('/child/image/:childId')
    async addChildImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { childId } = req.params;
        const images = 'images';
        if (!req.files) {
            next(new HttpException(404, 'Brak obrazu'));
        } else {
            try {
                const foundChild = await ChildModel.findById(childId);
                if (foundChild) {
                    if (foundChild.images && foundChild.images.length >= 5) {
                        next(new HttpException(404, 'Przekroczony limit ilości zdjęć'));
                    } else {
                        const files = req.files as Express.Multer.File[];
                        const imageUrl = files[0].path.replace(files[0].destination, images)
                        const source = files[0].path.replace('uploads', images)   //It's will be remove
                        const target = source.replace(images, 'build/images')     //It's will be remove
                        await sharp(files[0].path)
                            .resize(500, 332)
                            .jpeg({ quality: 90 })
                            .toFile(path.resolve(images, files[0].filename))
                        fs.unlinkSync(files[0].path);
                        fs.copyFile(source, target, (err) => {              //It's will be remove
                            console.log(err)                                //It's will be remove
                        })                                                  //It's will be remove
                        foundChild.images = [...foundChild.images!, imageUrl];
                        await foundChild.save()
                        res.status(201).json(
                            {
                                message: `Dodano zdjęcia dla ${foundChild.firstName} ${foundChild.lastName}`,
                                images: foundChild.images
                            });
                    }

                } else {
                    next(new HttpException(404, 'Nieudane dodanie zdjęcia. Nie znaleziono dziecka.'));
                }
            } catch (err) {
                next(new HttpException(404, 'Nieudane dodanie zdjęcia'));
            }
        }
    }

    @put('/user/alldata/:userId')
    @bodyValidator(ValidatorKeys.updateUser)
    async updateUserAllData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const payload = req.body;

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                next(new HttpException(404, "Nie znaleziono użytkownika"))
            } else {
                if (await bcrypt.compare(payload.oldPassword, user.password!)) {
                    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
                    user.password = hashedPassword;
                    user.firstName = payload.firstName;
                    user.lastName = payload.lastName;
                    user.phone = payload.phone;
                    user.email = payload.email;
                    user.zipCode = payload.zipCode;
                    user.town = payload.town;
                    user.street = payload.street;
                    user.number = payload.number;
                    await user.save();
                    const dto = new UserDto(user);
                    res.status(201).json({ user: dto.getContent(false), message: `Dane użytkownika ${user.firstName} ${user.lastName} zostały zaktualizowane.` })
                } else {
                    next(new HttpException(404, "Niepoprawne stare hasło użytkownika"))
                }
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana aktualizacja danych użytkownika'));
        }
    }

    @put('/user/data/:userId')
    @bodyValidator(ValidatorKeys.addUser)
    async updateUserData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const payload = req.body;

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                next(new HttpException(404, "Nie znaleziono użytkownika"))
            } else {
                user.firstName = payload.firstName;
                user.lastName = payload.lastName;
                user.phone = payload.phone;
                user.email = payload.email;
                user.zipCode = payload.zipCode;
                user.town = payload.town;
                user.street = payload.street;
                user.number = payload.number;
                await user.save();
                const dto = new UserDto(user);
                res.status(201).json({ user: dto.getContent(false), message: `Dane użytkownika ${user.firstName} ${user.lastName} zostały zaktualizowane.` })
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana aktualizacja danych użytkownika'));
        }
    }

    @put('/user/password/:userId')
    @bodyValidator(ValidatorKeys.updateUserPassword)
    async updateUserPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = req.params;
        const payload = req.body;

        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                next(new HttpException(404, "Nie znaleziono użytkownika"))
            } else {
                if (await bcrypt.compare(payload.oldPassword, user.password!)) {
                    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
                    user.password = hashedPassword;
                    await user.save();
                    const dto = new UserDto(user);
                    res.status(201).json({ user: dto.getContent(false), message: `Dane użytkownika ${user.firstName} ${user.lastName} zostały zaktualizowane.` })
                } else {
                    next(new HttpException(404, "Niepoprawne stare hasło użytkownika"));
                }
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudana aktualizacja danych użytkownika'));
        }
    }
}

