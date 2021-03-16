import { IsEmail, IsString, MinLength } from 'class-validator';

export class addMessageDto {
    @IsString()
    @MinLength(5)
    public name: string;
    @IsEmail()
    public email: string;
    @IsString()
    @MinLength(5)
    public content: string;
    constructor(name: string, email: string, content: string) {
        this.name = name;
        this.email = email;
        this.content = content;
    }
}