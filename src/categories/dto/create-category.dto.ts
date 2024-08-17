import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({ message: "Título no puede ser un valor vacío" })
    @IsString({ message: "Título debe ser una cadena de texto" })
    title: string;

    @IsOptional()
    @IsString({ message: "Descripción debe ser una cadena de texto" })
    description: string;

    @IsBoolean({ message: "Habilitado debe ser tipo boleano" })
    enabled: boolean;
}
