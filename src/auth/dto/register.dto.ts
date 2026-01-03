import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fname: string;
    @IsString()
    @IsNotEmpty()
    lname: string;
    @IsString()
    @IsNotEmpty()
    password: string


}