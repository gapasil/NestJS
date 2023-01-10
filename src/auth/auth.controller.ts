import { Body, Controller, Get, Post, Redirect, Req, Request, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/files/files.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { loginUserDto } from 'src/user/dto/loginUser.dto';
import { User } from 'src/user/user.schema';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly appService: AuthService
  ) {}

  @Post("registration")
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
  ]))
  registration(@UploadedFiles() files: { avatar?: Express.Multer.File[] }, @Body() dto: CreateUserDto) {
    return this.appService.registration(dto, files);
  } 

  @Post("login")
  login(@Body() loginUserDto : loginUserDto): Promise<any>{
    return this.appService.login(loginUserDto)
  }

  @Get("activateemail/:link")
  async activateEmail(@Request() req, @Res() res): Promise<any>{
    const activationLink = req.params.link
    await this.appService.activate(activationLink)
    return res.redirect(`${process.env.FRONT__URL}`)
  }
  
  // @Get("getallusers")
  // @Roles(Role.admin)
  // getAllUsers(@Body )
}
