import express, { Request, Response, NextFunction } from 'express';
import mongoose, { Connection } from 'mongoose';
import cors from 'cors';
import sanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import { AppRouter } from './routes';
import "./controllers/AuthController";
import "./controllers/UserController";
import { errorMiddleware } from './middleware'
dotenv.config();

const app = express();

app.use(cors());
app.use(sanitize());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Authorization, Content-Type");
    next();
});
app.use(AppRouter.getInstance());
app.use(errorMiddleware);

mongoose.connect(process.env.DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
let db: Connection = mongoose.connection;
db.once('open', (): void => {
    console.log('Connected to database')
})
db.on('error', (err: Error): void => console.log(`Error connection: ${err}`));
app.listen(3001, (): void => {
    console.log('Server started at port 3001');
})