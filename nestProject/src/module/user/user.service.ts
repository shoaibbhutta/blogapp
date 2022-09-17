import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../../module/auth/dto/UserRegisterDto';
import { User } from '../../model/user.model';
import { RoleService } from '../role/role.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findAll(query): Promise<User[]> {
    const result = await this.userModel.find(query);
    return result;
  }

  async findOne(query): Promise<User | null> {
    // console.log('===============>>>>', query);, { relations: ['roles'] }
    return await this.userModel.findOne(query);
  }

  async create(userCreate: UserRegisterDto): Promise<User> {
    // console.log('===============>>>>', userCreate);
    const role = await this.roleService.findById(2);
    const data = { ...userCreate, Role: role };
    const user = this.userModel.create(data);
    await this.userModel.save(user);
    return user;
  }
}
