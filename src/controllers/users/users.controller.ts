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
import { UsersService } from 'src/services/users/users.service';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { AuthGuard } from 'src/middlewares/auth.middleware';

import { RequestWithUser } from 'src/interfaces/request-user';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

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
}



