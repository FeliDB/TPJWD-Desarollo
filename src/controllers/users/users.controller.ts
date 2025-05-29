import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { Permissions } from 'src/decorators/permissions.decorator';  // Ajusta ruta según tu proyecto

@Controller('users')
export class UsersController {
    constructor (private usersService: UsersService){}

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

}

