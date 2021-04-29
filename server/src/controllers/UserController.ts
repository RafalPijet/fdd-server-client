import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { post, get, put } from '../routes';
import { RequestWithUser } from '../middleware';
import HttpException from '../exceptions/HttpException';
import { IMessage, buildMessage, MessageModel, OutSideMessageModel, ChildModel, IChild, buildChild, IUser, UserModel } from '../models';

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

    @put('/child/avatar/:childId')
    async addChildAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { childId } = req.params;
        const avatars = 'avatars';
        if (!req.file) {
            next(new HttpException(404, 'Brak portretu'));
        } else {
            try {
                const foundChild = await ChildModel.findById(childId);
                if (foundChild) {
                    const imageUrl = req.file.path.replace(req.file.destination, avatars)
                    const source = req.file.path.replace('uploads', avatars)   //It's will be remove
                    const target = source.replace(avatars, 'build/avatars')     //It's will be remove
                    await sharp(req.file.path)
                        .resize(120, 120)
                        .jpeg({ quality: 90 })
                        .toFile(path.resolve(avatars, req.file.filename))
                    fs.unlinkSync(req.file.path);
                    fs.copyFile(source, target, (err) => {              //It's will be remove
                        console.log(err)                                //It's will be remove
                    })                                                  //It's will be remove
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
        if (!req.file) {
            next(new HttpException(404, 'Brak obrazu'));
        } else {
            try {
                const foundChild = await ChildModel.findById(childId);
                if (foundChild) {
                    if (foundChild.images && foundChild.images.length >= 5) {
                        next(new HttpException(404, 'Przekroczony limit ilości zdjęć'));
                    } else {
                        const imageUrl = req.file.path.replace(req.file.destination, images)
                        const source = req.file.path.replace('uploads', images)   //It's will be remove
                        const target = source.replace(images, 'build/images')     //It's will be remove
                        await sharp(req.file.path)
                            .resize(500, 332)
                            .jpeg({ quality: 90 })
                            .toFile(path.resolve(images, req.file.filename))
                        fs.unlinkSync(req.file.path);
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

    @put('/child/images')
    async updateImagesList(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { contentList, removeList, id } = req.body;
        const clearImage = (filePath: string) => {
            filePath = path.join(__dirname, '../', filePath)
            if (filePath.includes('build')) {                             //It's will be remove
                fs.unlink(filePath, err => {                              //It's will be remove
                    console.log(err)                                      //It's will be remove
                })                                                        //It's will be remove
                filePath = filePath.replace('build/', '')                 //It's will be remove
            }                                                             //It's will be remove
            fs.unlink(filePath, err => {
                console.log(err)
            })
        }
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
}

