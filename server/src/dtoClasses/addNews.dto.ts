import { IsString, MinLength, IsOptional } from 'class-validator';

export class addNewsDto {
    @IsString({ message: 'Tytuł musi być tekstem.' })
    @MinLength(10, { message: 'Tytuł musi zawierać minimum 10 znaków.' })
    @IsOptional()
    public title: string;
    @IsString({ message: 'Treść artukułu musi być tekstem.' })
    @MinLength(50, { message: 'Treść artukułu musi zawierać minimum 50 znaków.' })
    @IsOptional()
    public content: string;
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}