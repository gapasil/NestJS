import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserShema } from 'src/user/user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/user/users.module';
import { APP_GUARD } from '@nestjs/core';
import { FileService } from 'src/files/files.service';
import { MailerService } from 'src/mail/mailer.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtActivateGuard } from './guard/jwt.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    FileService,
    MailerService,
    JwtStrategy,
    JwtActivateGuard,
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      privateKey: `${process.env.TOKEN_SECRET}`,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [JwtStrategy, JwtActivateGuard],
})
export class AuthModule {}
