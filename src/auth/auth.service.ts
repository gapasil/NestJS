import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from 'src/user/user.schema';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { FileService, FileType } from 'src/files/files.service';
import * as uuid from "uuid"
import { MailerService } from 'src/mail/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService  : UsersService,
    private jwtService    : JwtService,
    @InjectModel(User.name) 
    private userModel     : Model<UserModel>,
    private fileService   : FileService,
    private mailerService : MailerService
  ) {}

  async login(user): Promise<any>{
    const candidate = await this.userModel.findOne({"email":user.email})
    if(!candidate){
      throw new HttpException("Пользователь с таким email не существует", HttpStatus.BAD_REQUEST)
    }
    const token = await bcrypt.compare(user.password, candidate.password)
    .then((res)=>{
      if(!res){
        throw new HttpException("Не правильный логин или пароль", HttpStatus.BAD_REQUEST)
      } else {
        return this.generateToken(candidate)
      }
    })
    return token
  }

  async registration(user, avatar): Promise<string> {
    try{
      let newUser
      
      if(user.email){
        const candidate = await this.userModel.findOne({"email":user.email})
        if(candidate){
          throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
      } else if(user.phoneReg){
        const candidate = await this.userModel.findOne({"phoneReg":user.phoneReg})
        if(candidate){
          throw new HttpException("Пользователь с таким телефоном уже существует", HttpStatus.BAD_REQUEST)
        }
      }
      if(!user.email && !user.phoneReg){
        throw new HttpException("Введите номер или email", HttpStatus.BAD_REQUEST)
      }

      const activationLinkEmail = uuid.v4()

      let nameFile = "avatar/default.png"
      
      if(avatar.avatar)
      {
        nameFile = this.fileService.createFile(FileType.AVATAR, avatar.avatar[0])
      }
      
      const hashPass = await bcrypt.hash(user.password, 7)
      let   emailCodeErr

      if(user.email){
        setTimeout(async ()=>{

          emailCodeErr = await this.mailerService.mailer(user, `${process.env.URL}auth/activateemail/${activationLinkEmail}`)

          if(emailCodeErr){
            if(emailCodeErr.responseCode == 501){
              throw new HttpException("Не удалось доставить сообщение такого почтового ящика не существует!", HttpStatus.BAD_REQUEST)
            }
            
            this.usersService.deleteUser({ activationLinkEmail: activationLinkEmail })
            return
          }

        },2000)
      }

      newUser = await this.usersService.createUser({...user, password: hashPass, role: "user", avatar: nameFile, activationLinkEmail: activationLinkEmail, isActivation:false})

      let token 

      await this.generateToken(newUser).then((res) => token = res)
      
      return JSON.stringify({message : "Переидите в почту которую указали при регистраций", token : token.token})

    } catch(e) {
      console.log(e);
      
      throw new HttpException(e.response || "Ошибка регистраций", HttpStatus.BAD_REQUEST)
    }
  }

  async activate(link){
    const user = await this.userModel.findOne({"activationLinkEmail":link})
    if(!user){
      throw new HttpException("Некоректная ссылка", HttpStatus.BAD_REQUEST)
    }
    user.isActivation = true
    await user.save()
  }

  async generateToken(user): Promise<any>{
    const payload = {...user}
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
