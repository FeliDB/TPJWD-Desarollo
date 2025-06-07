import { Body, Controller, Param, Post, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { RoleService } from 'src/services/role/role.service';

@Controller('role')
export class RoleController {
    constructor (private roleService: RoleService){}

    @UseGuards(AuthGuard)
    @Permissions(['create_role'])
    @Post()
    postRole(@Body() body: any){
        return this.roleService.createRole(body)
    }

    @Permissions(['modify_role'])
    @Put()
    putRole(@Body() body: any){
        return this.roleService.updateRole(body)
    }

    


}