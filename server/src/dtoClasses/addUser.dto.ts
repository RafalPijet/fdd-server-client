import { IsString, MinLength, IsNumberString, IsNotEmpty, IsEmail, MaxLength, IsIn } from 'class-validator';
import { UserStatus, IUser } from '../models';

export class addUserDto implements IUser {
    @IsIn([UserStatus.admin, UserStatus.parent], { message: 'Status musi być administartorem lub rodzicem' })
    public status: UserStatus;
    @IsString({ message: 'Imię musi być tekstem.' })
    @MinLength(3, { message: 'Imię musi zawierać minimum 3 znaki.' })
    public firstName: string;
    @IsString({ message: 'Nazwisko musi być tekstem.' })
    @MinLength(3, { message: 'Nazwisko musi zawierać minimum 3 znaki.' })
    public lastName: string;
    @IsNumberString()
    @IsNotEmpty({ message: 'Numer telefonu musi mieć poprawny format' })
    public phone: string;
    @IsEmail(undefined, { message: 'Niepoprawny adres email' })
    public email: string;
    @IsNotEmpty({ message: 'Hasło musi być podane' })
    @MinLength(5, { message: 'Hasło musi zawierać minimum 5 znaków.' })
    @IsString()
    public password: string;
    @IsNumberString(undefined, { message: 'Kod pocztowy musi zawierać cyfry' })
    @MinLength(5, { message: 'Kod pocztowy musi zawierać 5 cyfr' })
    @MaxLength(5)
    public zipCode: string;
    @IsString()
    @IsNotEmpty({ message: 'Nie podano nazwy miasta' })
    @MinLength(3, { message: 'Minimalna nazwa miasta musi zawierać 3 litery' })
    public town: string;
    @IsString()
    @IsNotEmpty({ message: 'Nie podano nazwy ulicy' })
    @MinLength(3, { message: 'Nazwa ulicy musi zawierać minimum 3 litery' })
    public street: string;
    @IsString()
    @IsNotEmpty({ message: 'Nie podano numeru' })
    @MinLength(1)
    public number: string;
    constructor(status: UserStatus,
        firstName: string,
        lastName: string,
        phone: string,
        email: string,
        password: string,
        zipCode: string,
        town: string,
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
        this.town = town;
        this.street = street;
        this.number = number;
    }
}