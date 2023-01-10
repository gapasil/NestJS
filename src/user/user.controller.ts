import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleAdminGuard } from 'src/roles/guard/rolesAdmin.guard';
import { JwtActivateGuard } from 'src/auth/guard/jwt.guard';

@Controller("user")
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtActivateGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.getUser(req);
  }

  @Get('getAuthor')
  getAuthor(@Request() req) {
    return this.usersService.getAuthor();
  }

  @Post('getUserId')
  getUserId(@Request() req) {
    return this.usersService.getUserId(req);
  }

  @Post('getUserNameLastName')
  getUserNameLastName(@Request() req) {
    return this.usersService.getUserNameLastName(req);
  }

  @UseGuards(RoleAdminGuard)
  @Post('makeModer')
  makeModerUser(@Request() req) {
    return this.usersService.makeModerUser(req);
  }

  @UseGuards(RoleAdminGuard)
  @Post('putModerUser')
  putModerUser(@Request() req) {
    return this.usersService.putModerUser(req);
  }
  
  @UseGuards(RoleAdminGuard)
  @Get('getallusers')
  getAllUsers() {
    return this.usersService.getAllUser();
  }
}