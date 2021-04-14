import { IsEmail, IsString, MinLength } from 'class-validator';

export class addMessageDto {
    @IsString({ message: 'Imię i nazwisko musi być tekstem.' })
    @MinLength(5, { message: 'Imię i nazwisko musi zawierać minimum 5 znaków.' })
    public name: string;
    @IsEmail(undefined, { message: 'Niepoprawny adres email' })
    public email: string;
    @IsString({ message: 'Wiadomość musi być tekstem.' })
    @MinLength(5, { message: 'Wiadomość musi zawierać minimum 5 znaków.' })
    public content: string;
    constructor(name: string, email: string, content: string) {
        this.name = name;
        this.email = email;
        this.content = content;
    }
}