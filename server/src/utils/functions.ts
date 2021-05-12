import fs from 'fs';
import path from 'path';
import { IUser } from '../models';
import { UserDataDTO } from '../types';

export const removeDuplicates = (data: any, key: any) => {

    return [
        ...new Map(data.map((item: any) => [key(item), item])).values()
    ]

};

export const clearImage = (filePath: string) => {
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

export class UserDto {
    constructor(private user: IUser) {
        this.user = user;
    }
    getContent(isChildren: boolean): UserDataDTO {
        return {
            _id: this.user._id!,
            status: this.user.status,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone,
            children: isChildren ? this.user.children! : undefined,
            adress: {
                zipCode: this.user.zipCode,
                town: this.user.town,
                street: this.user.street,
                number: this.user.number
            }
        }
    }
}