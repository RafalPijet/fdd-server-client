import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods, MetadataKeys } from './';

interface RouteHandlerDescriptor extends PropertyDescriptor {
    value?: RequestHandler
}

const routeBinder = (method: string) => {
    return (path: string) => {
        return (target: any, key: string, desc: RouteHandlerDescriptor) => {
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
            Reflect.defineMetadata(MetadataKeys.path, path, target, key);
        }
    }
}
export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const put = routeBinder(Methods.put);