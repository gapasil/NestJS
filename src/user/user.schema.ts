import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resolver } from 'dns';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

export type UserModel = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ required: true })
  role: Role[];

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  phoneReg: string;

  @Prop()
  activationLinkEmail: string;

  @Prop()
  isActivation: boolean;
}

export const UserShema = SchemaFactory.createForClass(User);
