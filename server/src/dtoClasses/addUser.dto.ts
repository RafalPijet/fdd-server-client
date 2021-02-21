import { IsString, MinLength, IsNumberString, IsNotEmpty, IsEmail, Contains, MaxLength } from 'class-validator';
import { UserStatus, IUser } from '../models';

export class addUserDto implements IUser {
    @Contains(UserStatus.admin || UserStatus.parent, { message: 'status must contain a admin or parent string' })
    public status: UserStatus;
    @IsString()
    @MinLength(3)
    public firstName: string;
    @IsString()
    @MinLength(3)
    public lastName: string;
    @IsNumberString()
    @IsNotEmpty()
    public phone: string;
    @IsEmail()
    public email: string;
    @IsNotEmpty()
    @IsString()
    public password: string;
    @IsNumberString()
    @MinLength(5)
    @MaxLength(5)
    public zipCode: string;
    @IsString()
    @IsNotEmpty()
    public locality: string;
    @IsString()
    @IsNotEmpty()
    public street: string;
    @IsString()
    @IsNotEmpty()
    public number: string;
    constructor(status: UserStatus,
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        password: string,
        zipCode: string,
        locality: string,
        street: string,
        number: string
    ) {
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.zipCode = zipCode;
        this.locality = locality;
        this.street = street;
        this.number = number;
    }
}