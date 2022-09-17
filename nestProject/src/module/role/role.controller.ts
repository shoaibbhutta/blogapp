import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { createRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRole(@Body() body: createRoleDto) {
    return await this.roleService.createRole(body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteRole(@Param('roleId') roleId: number) {
    return await this.roleService.deleteRole(roleId);
  }
}
