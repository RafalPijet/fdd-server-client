import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
    @IsEmail()
    public email: string = '';
    @IsString()
    public password: string = '';
}