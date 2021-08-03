import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { controller, bodyValidator, ValidatorKeys } from './decorators';
import { createToken } from './token.service';
import { get, post } from '../routes';
import {
    UserModel,
    IUser,
    buildUser,
    IOutsideMessage,
    buildOutSideMessage,
    NewsModel,
    ChildModel,
    ReportModel,
    IReport
} from '../models';
import HttpException from '../exceptions/HttpException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialException';
import { UserDto, removeDuplicates } from '../utils/functions';
import { io } from '../index';
dotenv.config();
const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_KEY!
    })
);

@controller('/api/auth')
class AuthController {
    @post('/login')
    @bodyValidator(ValidatorKeys.login)
    async postLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email }).populate('children');
            if (user && user.password) {

                if (await bcrypt.compare(password, user.password)) {
                    user.password = undefined;
                    const tokenData = createToken(user, 28800);

                    const dto = new UserDto(user);
                    res.status(201).json({ dto: dto.getContent(true), authorization: tokenData });
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
                io.emit('change');
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

    @get('/reset')
    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        let { email } = req.query;
        email = email?.toString()

        try {
            const user = await UserModel.findOne({ email });
            if (user) {
                const tokenData = createToken(user, 900);
                transporter.sendMail({
                    to: user.email,
                    from: process.env.FDD_Email,
                    subject: 'Fundacja Dorośli Dzieciom',
                    html: `
                    <h2>ZMIANA HASŁA</h2>
                    <h3>Dzień dobry ${user.firstName} ${user.lastName}</h3>
                    <p>Otrzymaliśmy zgłoszenie zmiany Twojego hasła</p>
                    <p>Aby zmienić hasło kliknij poniższy link:</p>
                    <a href="${process.env.URL}change/${user.email}/${tokenData.token}">link do zmiany hasła ważny przez 15 minut</a>
                `
                });
                res.status(200).json({ message: `Na adres ${email} został wysłany link do zmiany hasła` })
            } else {
                next(new HttpException(404,
                    `Podany adres email: ${email} nie istnieje w bazie danych!`))
            }
        } catch (err) {
            next(new HttpException(404, 'Nie znaleziono użytkownika'));
        }
    }

    @get('/news')
    async getAllNews(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const news = await NewsModel.find();
            res.status(200).json({ news });
        } catch (err) {
            next(new HttpException(404, `Błąd pobierania artukułów!. - ${err}`))
        }
    }
    @get('/children/basic/data')
    async getChildrenBasicData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { page, rowsPerPage } = req.query;

        try {
            const quantity = await ChildModel.find({ active: true }).countDocuments();
            if (page !== undefined && rowsPerPage !== undefined) {
                const children = await ChildModel.find({ active: true })
                    .sort({ createdAt: -1 })
                    .skip(+page * +rowsPerPage)
                    .limit(+rowsPerPage);
                const childrenToSend = children.map((child) => {
                    return {
                        _id: child._id,
                        name: `${child.firstName} ${child.lastName}`,
                        avatar: child.avatar
                    }
                })
                res.status(200).json({ children: childrenToSend, quantity });
            }
        } catch (err) {
            next(new HttpException(404, `Błąd pobierania listy podopiecznych!. - ${err}`))
        }
    }

    @get('/child/:id')
    async getChildById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const child = await ChildModel.findById(id);
            if (!child) {
                next(new HttpException(404, 'Nie znaleziono podopiecznego'));
            } else {
                child.invoices = undefined;
                child.parent = undefined;
                res.status(200).json({ child });
            }
        } catch (err) {
            next(new HttpException(404, `Błąd pobierania danych podopiecznego!. - ${err}`))
        }
    }

    @get('/children/names')
    async getChildrenNames(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const children = await ChildModel.find({ active: true });
            if (!children) {
                next(new HttpException(404,
                    `Brak dostępnych danych`))
            } else {
                const names = children.map((child) => {
                    return {
                        _id: child._id,
                        name: `${child.firstName} ${child.lastName}`
                    }
                })
                res.status(200).json({ names });
            }
        } catch (err) {
            next(new HttpException(404,
                `Brak dostępnych danych. - ${err}`))
        }
    }

    @get('/reports/years')
    async getReportsYears(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const reports = await ReportModel.find().sort({ createdAt: -1 });
            if (!reports.length) {
                next(new HttpException(404,
                    `Brak dostępnych danych`))
            } else {
                const years = reports.map((report: IReport) => {
                    if (report.createdAt) {
                        return { year: report.createdAt.toISOString().substring(0, 4) };
                    }
                })
                const availableYears = removeDuplicates(years, (item: any) => item.year)
                res.status(200).json({ availableYears });
            }
        } catch (err) {
            next(new HttpException(404, 'Nieudane pobranie danych o zakresie lat sprawozdań'));
        }
    }

    @get('/reports/:year')
    async getReportsByYear(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { year } = req.params;

        try {
            const reports = await ReportModel.find();
            if (!reports.length) {
                next(new HttpException(404,
                    `Brak dostępnych danych`))
            } else {
                const selectedYearReports = reports.filter((report: IReport) => report.createdAt?.toISOString().substring(0, 4) === year);
                res.status(200).json({ selectedYearReports });
            }
        } catch (err) {
            next(new HttpException(404, `Nieudane pobranie sprawozdań za ${year} rok`));
        }
    }
}