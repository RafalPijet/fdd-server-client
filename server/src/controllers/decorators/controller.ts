import 'reflect-metadata';
import { ValidatorKeys } from './'
import { AppRouter, Methods, MetadataKeys } from '../../routes';
import { validationMiddleware } from '../../middleware';
import { LoginDto, addUserDto } from '../../dtoClasses';

export const availableDto = {
    1: LoginDto,
    2: addUserDto
}

export const controller = (routePrefix: string) => {
    return (target: Function) => {
        const router = AppRouter.getInstance();

        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const validationKey: ValidatorKeys = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || ValidatorKeys.null;

            if (path) {
                if (validationKey !== ValidatorKeys.null) {
                    const validator = validationMiddleware(availableDto[validationKey]);
                    router[method](`${routePrefix}${path}`, validator, routeHandler);
                } else {
                    router[method](`${routePrefix}${path}`, routeHandler);
                }
            }
        }
    }
}