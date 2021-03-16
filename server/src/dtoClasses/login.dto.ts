import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    public email: string = '';
    @IsNotEmpty()
    @IsString()
    public password: string = '';
}