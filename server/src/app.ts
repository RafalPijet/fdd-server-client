import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';
import sanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import uuid from 'uuid';
import * as http from 'http';
import * as socket from 'socket.io';
import * as dotenv from 'dotenv';
import { AppRouter } from './routes';
import "./controllers/AuthController";
import "./controllers/UserController";
import "./controllers/AdminController";
import { IOSocket } from './socket';
import { errorMiddleware } from './middleware'
dotenv.config();

const app = express();
const server: http.Server = http.createServer(app);
export const io = new IOSocket(server).getIO();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + '-' + file.originalname);
    }
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(cors());
app.use(sanitize());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(multer({ storage: storage, fileFilter }).array('image', 2));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
app.use('/pictures', express.static(path.join(__dirname, 'pictures')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Authorization, Content-Type");
    next();
});
app.use(AppRouter.getInstance());
app.use(errorMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Internal Server Error");
    res.status(501).send({ message: error.message })
});

mongoose.connect(process.env.DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

let db: Connection = mongoose.connection;
db.once('open', (): void => {
    console.log('Connected to database')
})
db.on('error', (err: Error): void => console.log(`Error connection: ${err}`));
io.on('connection', (socket: socket.Socket) => {
    console.log('Client connected');
})
server.listen(3000, (): void => {
    console.log('Server started at port 3000');
})

console.log("lubie placki");