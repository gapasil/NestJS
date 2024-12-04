import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../user/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.TOKEN_SECRET}`,
    });
    console.log('Token secret:', process.env.TOKEN_SECRET);
  }

  async validate(payload: any) {
    console.log(payload);
    const user = this.usersService.getUserId({
      body: {
        ...payload,
        id: payload._doc._id,
      },
    });
    console.log(user);
    return user;
  }
}
