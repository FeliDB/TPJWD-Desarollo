import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';
import { UsersService } from 'src/services/users/users.service';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { AuthGuard } from 'src/middlewares/auth.middleware';

import { RequestWithUser } from 'src/interfaces/request-user';

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
    return this.userService.canDo(request.user, permission);
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.userService.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }
}



