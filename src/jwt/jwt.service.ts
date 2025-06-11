import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import * as dayjs from 'dayjs';
import { Payload } from 'src/interfaces/payload';
import { ConfigService } from '@nestjs/config';
import exp from 'constants';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  generateToken(payload: object, type: 'auth' | 'refresh' = 'auth'): string {
    const secret: string =
      this.configService.get(type === 'auth' ? 'JWT_SECRET_AUTH' : 'JWT_SECRET_REFRESH') ?? 'defaultSecret';

    const expiresIn: string | number =
      this.configService.get(type === 'auth' ? 'JWT_EXPIRES_IN_AUTH' : 'JWT_EXPIRES_IN_REFRESH') ?? '15m';

    return sign(payload, secret);
  }




  refreshToken(refreshToken: string): { accessToken: string; refreshToken: string } {
    try {
      const payload = this.getPayload(refreshToken, 'refresh');
      const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');

      return {
        accessToken: this.generateToken({ email: payload.email }),
        refreshToken:
          timeToExpire < 20
            ? this.generateToken({ email: payload.email }, 'refresh')
            : refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  getPayload(token: string, type: 'auth' | 'refresh' = 'auth'): Payload {
    const secret = this.configService.get<string>(
      type === 'auth' ? 'JWT_SECRET_AUTH' : 'JWT_SECRET_REFRESH',
    );

    const decoded = verify(token, secret);

    if (typeof decoded === 'string') {
      throw new UnauthorizedException('Token inválido');
    }

    return decoded as Payload;
  }
}
