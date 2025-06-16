import { Body, Controller, Post } from '@nestjs/common';
import { PermissionsService } from '../../services/permissions/permissions.service';

@Controller('permissions')
export class PermissionsController {
    constructor (private permissionsService: PermissionsService){}

    @Post()
    createPermission(@Body() body: any){
        return this.permissionsService.createPermission(body)
    }
    

}
