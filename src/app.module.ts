import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MailerModule } from './mail/mailer.module';
import { PostModule } from './post/post.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    FilesModule,
    MailerModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    MongooseModule.forRoot(
      `mongodb+srv://gapasilka6:${process.env.MONGOPASS}@article.jgwfs.mongodb.net/?retryWrites=true&w=majority&appName=article`,
    ),
  ],
})
export class AppModule {
  constructor() {
    console.log('MONGOPASS:', process.env.MONGOPASS); // Логируем переменную после загрузки конфигурации
  }
}
