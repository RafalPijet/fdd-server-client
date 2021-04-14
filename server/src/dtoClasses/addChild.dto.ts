import { IsString, MinLength, MinDate, MaxDate, IsDate, IsDateString } from 'class-validator';

export class addChildDto {
    @IsString({ message: 'Imię dziecka musi być tekstem.' })
    @MinLength(3, { message: 'Imię dziecka musi zawierać minimum 3 znaki.' })
    public firstName: string;
    @IsString({ message: 'Nazwisko dziecka musi być tekstem.' })
    @MinLength(3, { message: 'Nazwisko dziecka musi zawierać minimum 3 znaki.' })
    public lastName: string;
    @IsDateString(undefined, { message: 'Błędna data urodzenia dziecka' })
    public birthDate: Date;
    @IsString({ message: 'Informacja o dziecku musi być tekstem.' })
    @MinLength(20, { message: 'Informacja o dziecku musi zawierać minimum 20 znaków.' })
    public info: string;
    constructor(firstName: string, lastName: string, birthDate: Date, info: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.info = info;
    }
}