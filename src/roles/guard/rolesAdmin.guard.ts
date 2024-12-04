import {
  ExecutionContext,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleAdminGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(user);

    if (err || !user) {
      throw err || new UnauthorizedException();
    } else if (user._doc.role[0] != Role.admin) {
      throw err || new ForbiddenException('Нету доступа');
    }

    return user;
  }
}
