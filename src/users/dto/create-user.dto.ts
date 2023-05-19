import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  companyName: string;
}
