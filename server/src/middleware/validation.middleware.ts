import { RequestHandler, Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import HttpException from '../exceptions/HttpException';

export const validationMiddleware = (type: any): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body))
            .then((errors: ValidationError[]) => {

                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
                    next(new HttpException(400, message))
                } else {
                    next();
                }
            });
    }
}