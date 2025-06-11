import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { RoleService } from './services/role/role.service';
import { RoleModule } from './role/role.module';
import { RoleController } from './controllers/role/role.controller';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersModule } from './users/users.module';
import { PermissionsController } from './controllers/permissions/permissions.controller';
import { PermissionsService } from './services/permissions/permissions.service';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'usuariosdb',
      username: 'agustin',
      password: '12345',
      synchronize: true,
      entities,
      port: 5439,
      host: 'localhost',
    }),
    TypeOrmModule.forFeature(entities),// entidades por cada modulo
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: ''
    }),  ],
  controllers: [AppController, RoleController, UsersController, PermissionsController],
  providers: [AuthGuard, JwtService, RoleService, UsersService, PermissionsService],
})
export class AppModule {}