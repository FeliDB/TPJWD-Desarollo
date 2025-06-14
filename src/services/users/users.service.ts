import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from 'src/entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import axios from 'axios';
import { RoleEntity } from 'src/entities/roles.entity'


@Injectable()
export class UsersService {
  repository = UserEntity;
  roleRepository = RoleEntity;
  constructor(private jwtService: JwtService) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserI, permission: string): boolean {
    const result = user.permissionCodes.includes(permission);
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

async register(body: RegisterDTO) {
  try {
    // Buscar el rol por nombre y traer sus permisos también
    const role = await this.roleRepository.findOne({
      where: { nombre: body.rol },
      relations: ['permission'], // 👈 trae también los permisos del rol
    });


    const user = new UserEntity();
    user.email = body.email;
    user.password = hashSync(body.password, 10);
    user.role = role; // 👈 aquí se asigna la entidad Role con permisos incluidos

    await this.repository.save(user);

    return { status: 'created' };
  } catch (error) {
    console.error(error);
    throw new HttpException('Error de creación', 500);
  }
}

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (user == null ) {
      throw new UnauthorizedException();
    }

    const compareResult = compareSync(body.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.generateToken({ email: user.email }, 'auth');
    const refreshToken = this.jwtService.generateToken({ email: user.email }, 'refresh');

    await this.enviarTokenAOtroBackend(accessToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async enviarTokenAOtroBackend(accessToken: string) {
    try {
      const response = await axios.get('http://localhost:3001/delivery', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Respuesta del otro backend:', response.data);
    } catch (error) {
      console.error('Error al comunicarse con el otro backend:', error.response?.data || error.message);
    }
  }

async findByEmail(email: string): Promise<UserEntity | null> {
  return await this.repository.findOne({
    where: { email },
    relations: ['role'], 
  });
}



}
