import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class loginUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @Length(4, 16, {message: 'Пароль должен быть не меньше 4 и не больше 16'})
    readonly password: string;
}
