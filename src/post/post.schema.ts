import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

export type PostModel = Post & Document;

@Schema()
export class Post {

  @Prop({ required: true })
  file: string;

  @Prop({ required: true })
  idUser: string;

  @Prop({ required: true , index: true })
  headers:string;

  @Prop({ required: true , index: true })
  paragraph:string;

  @Prop({ required: true })
  date: number;

  @Prop({ required: true })
  views: number;

  @Prop({ required: true })
  theme:string

  @Prop({ required: true })
  languagePost:string

  @Prop()
  imageView:string

  @Prop({ required: true })
  ipViewed:Array<string>
}

const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.index({paragraph:"text",headers:"text"})

export {PostSchema}