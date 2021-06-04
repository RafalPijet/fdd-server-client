import { IsString, MinLength } from 'class-validator';

export class addNewsDto {
    @IsString({ message: 'Tytuł musi być tekstem.' })
    @MinLength(10, { message: 'Imię i nazwisko musi zawierać minimum 10 znaków.' })
    public title: string;
    @IsString({ message: 'Treść artukułu musi być tekstem.' })
    @MinLength(10, { message: 'Treść artukułu musi zawierać minimum 50 znaków.' })
    public content: string;
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}