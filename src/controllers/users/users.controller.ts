import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { JwtService } from 'src/jwt/jwt.service';
import { Permissions } from 'src/decorators/permissions.decorator';  // Ajusta ruta según tu proyecto
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService, private jwtservice: JwtService){}

    @Permissions('createUser')
    @Post('createUsers')
    createUser(@Body() body: any){
        return this.usersService.createUser(body)
    }

    @Permissions('assignRole')
    @Post(':id/assignToUser')
    assignToUser(@Param('id') id: number, @Body() body: { roleId: number }) {
    return this.usersService.assignToUser(id, body);
    }

    @Post('login')
    async loginUser(@Body() body: any) {
        // Llamar al servicio para autenticar al usuario
        const user = await this.usersService.loginUser(body);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        // Generar el token una vez que el usuario está autenticado
        const token = this.jwtservice.generateToken({ email: user.email }, 'auth');

        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: JSON.stringify({ permissions: user.permissions })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

        // Devolver el usuario con el token generado
        return { user, token };
    }





 }


