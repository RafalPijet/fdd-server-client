import "reflect-metadata";
import { MetadataKeys } from '../../routes';

export enum ValidatorKeys {
    null,
    login,
    addUser
}

export const bodyValidator = (validKey: ValidatorKeys) => {
    return (target: any, key: string, desc: PropertyDescriptor) => {
        Reflect.defineMetadata(MetadataKeys.validator, validKey, target, key);
    }
}
