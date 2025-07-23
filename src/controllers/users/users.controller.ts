import {
  Body,
  Controller,
  Get,
  Head,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { UsersService } from '../../services/users/users.service';
import { LoginDTO } from '../../interfaces/login.dto';
import { RegisterDTO } from '../../interfaces/register.dto';
import { AuthGuard } from '../../middlewares/auth.middleware';

import { RequestWithUser } from '../../interfaces/request-user';
import { Permissions } from '../../middlewares/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return {
      email: req.user.email,
    };
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.userService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('can-do/:permission')
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    return { user: request.user, permission };
  }


  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.userService.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }

  @Post('existsUsers')
  existsUsers(@Body() body: { email: string }) {
    return this.userService.existsUsers(body.email);
  }
}



