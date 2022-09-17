import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../model/role.model';
import { roleDto } from './dto/role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleModel: Repository<Role>,
  ) {}
  async createRole(data: roleDto): Promise<Role> {
    let role = await this.findOne(data);
    if (role) {
      return role;
    }
    role = await this.roleModel.create(data);
    await this.roleModel.save(role);
    return role;
  }

  async findOne(data: roleDto): Promise<Role | null> {
    return await this.roleModel.findOne(data);
  }
  async findById(roleId: number): Promise<Role | null> {
    return await this.roleModel.findOne({ id: roleId });
  }
  async deleteRole(roleId: number): Promise<string> {
    await this.roleModel.delete({ id: roleId });
    return 'user deleted successfully';
  }
}
