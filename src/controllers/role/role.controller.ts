import { Body, Controller, Param, Post } from '@nestjs/common';
import { RoleService } from 'src/services/role/role.service';

@Controller('role')
export class RoleController {
    constructor (private roleService: RoleService){}

    @Post()
    postRole(@Body() body: any){
        return this.roleService.createRole(body)
    }


}
