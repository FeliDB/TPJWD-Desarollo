import { Payload } from 'src/interfaces/payload';
import { ConfigService } from '@nestjs/config';
export declare class JwtService {
    private configService;
    constructor(configService: ConfigService);
    generateToken(payload: object, type?: 'auth' | 'refresh'): string;
    refreshToken(refreshToken: string): {
        accessToken: string;
        refreshToken: string;
    };
    getPayload(token: string, type?: 'auth' | 'refresh'): Payload;
}
