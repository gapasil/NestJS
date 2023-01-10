import { ExecutionContext, ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
      // You can throw an exception based on either "info" or "err" arguments
      if (err || !user) {     
        throw err || new UnauthorizedException();

      } else if(!user._doc.isActivation){
        throw err || new ForbiddenException("Аккаунт не активирован по почте"); 
      }
      
      return user;
    }
}
