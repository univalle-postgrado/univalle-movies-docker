import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {

  @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
  @IsString({ message: 'Login debe ser una cadena de texto' })
  login: string;

  @IsNotEmpty({ message: 'Password no puede ser un valor vacío' })
  @IsString({ message: 'Password debe ser una cadena de texto' })
  password: string;

}
