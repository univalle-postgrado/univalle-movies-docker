import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateMovieDto {

    @IsNotEmpty({ message: 'Título no puede estar vacío' })
    @IsString({ message: 'Título debe ser una cadena de texto' })
    title: string;

    @IsNotEmpty({ message: 'Sinopsis no puede estar vacía' })
    @IsString({ message: 'Sinopsis debe ser una cadena de texto' })
    synopsis: string;

    @IsNotEmpty({ message: 'Director no puede estar vacío' })
    @IsString({ message: 'Director debe ser una cadena de texto' })
    director: string;

    @IsDateString({}, { message: 'Fecha de estreno debe ser de tipo fecha YYYY-MM-DD' })
    releaseDate: Date;

    @IsUrl({}, { message: 'La URL de la imagen debe tener formato URI' })
    posterUrl: string;

    @IsNumber({}, { message: 'Valoración debe ser un valor numérico' })
    @Min(0.0)
    @Max(10.0)
    rating: number;

    @IsNumber({}, { message: "Id de Categoría debe ser un valor numérico" })
    @IsPositive({ message: "Id de Categoría debe ser un número entero positivo" })
    categoryId: number;
}
