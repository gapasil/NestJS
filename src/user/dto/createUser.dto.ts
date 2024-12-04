import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  IsMobilePhone,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Фамилия должно быть строкой' })
  readonly lastName: string;
  @IsString({ message: 'Имя должно быть строкой' })
  readonly firstName: string;
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;
  @IsOptional()
  @IsMobilePhone('', { message: 'Некорректный номер телефона' })
  readonly phoneReg: string;
  @ApiProperty({ example: '12345', description: 'пароль' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
