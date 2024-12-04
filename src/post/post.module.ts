import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/files/files.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, FileService],
  exports: [
    PostService,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
})
export class PostModule {}
