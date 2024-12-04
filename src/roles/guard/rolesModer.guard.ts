import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleModerGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(user);

    if (err || !user) {
      throw err || new UnauthorizedException();
    } else if (
      user._doc.role[1] != Role.moder &&
      user._doc.role[0] != Role.admin
    ) {
      throw err || new ForbiddenException('Нету доступа');
    }

    return user;
  }
}
