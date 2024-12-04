import {
  Body,
  Injectable,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/enums/role.enum';
import { CreateUserDto } from './dto/createUser.dto';
import { DeleteUserDto } from './dto/deleteUser.dto';
import { User, UserModel } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserModel>) {}

  async makeModerUser(req) {
    const user = await this.userModel.findOne({ _id: req.body.id });
    if (!user) {
      throw new HttpException('Некоректный ID', HttpStatus.BAD_REQUEST);
    }
    user.role = [Role.user, Role.moder];
    return await user.save();
  }

  async putModerUser(req) {
    const user = await this.userModel.findOne({ _id: req.body.id });
    if (!user) {
      throw new HttpException('Некоректный ID', HttpStatus.BAD_REQUEST);
    }
    user.role = [Role.user];
    return await user.save();
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user.save();
  }

  async deleteUser(dto: DeleteUserDto) {
    await this.userModel.deleteOne(dto);
  }

  async getAuthor() {
    const users = await this.userModel.find().limit(5);
    return users;
  }

  async getUser(req) {
    return req.user._doc;
  }

  async getAllUser() {
    const users = await this.userModel.find();
    return users;
  }

  async getUserId(req) {
    const user = await this.userModel.find({ _id: req.body.id });
    return user[0];
  }

  async getUserNameLastName(req) {
    let user = await this.userModel.find({ firstName: req.body.name }).limit(5);
    if (!user) {
      user = await this.userModel.find({ lastName: req.body.name }).limit(5);
    }
    if (!user[0]) {
      return JSON.stringify({ message: 'Ничего не найдено' });
    }

    return user;
  }
}
