import { IsString } from 'class-validator';

export class CreateTovarDto {
  @IsString({ message: 'Название товара должно быть строкой' })
  readonly name: string;

  @IsString({ message: 'Описание товара должно быть строкой' })
  readonly details: string;

  @IsString({ message: 'Категория должна быть строкой' })
  readonly podKategories: string;
}
