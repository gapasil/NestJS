import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserController } from './user.controller';
import { User, UserShema } from './user.schema';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UsersService, JwtStrategy],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: User.name, schema: UserShema }]),
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserShema }]),
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}
