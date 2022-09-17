import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

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
    try {
      if (!data.name) {
        throw new BadRequestException('You must provide role name');
      }
      let role = await this.findOne(data);
      if (role) {
        return role;
      }
      role = await this.roleModel.create(data);
      await this.roleModel.save(role);
      return role;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(data: roleDto): Promise<Role | null> {
    try {
      return await this.roleModel.findOne(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async findById(roleId: string): Promise<Role | null> {
    try {
      return await this.roleModel.findOne({ id: roleId });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async deleteRole(roleId: string): Promise<{ message: string }> {
    try {
      await this.roleModel.delete({ id: roleId });
      return { message: 'user deleted successfully' };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
