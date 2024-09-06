import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

  @IsNotEmpty({ message: 'Login no puede ser un valor vacío' })
  @IsString({ message: 'Login debe ser una cadena de texto' })
  login: string;

  @IsNotEmpty({ message: 'Contraseña no puede ser un valor vacío' })
  @IsString({ message: 'Contraseña debe ser una cadena de texto' })
  password: string;

  @IsNotEmpty({ message: 'Nombre no puede ser un valor vacío' })
  @IsString({ message: 'Nombre debe ser una cadena de texto' })
  fullname: string;

  @IsNotEmpty({ message: 'Email no puede ser un valor vacío' })
  @IsEmail({}, { message: 'Email debe ser un correo electrónico válido' })
  email: string;

  @IsOptional()
  phone: string;

}
