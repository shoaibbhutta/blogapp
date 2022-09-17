import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../../module/auth/dto/UserRegisterDto';
import { User } from '../../model/user.model';
// import { RoleService } from '../role/role.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>, // private readonly roleService: RoleService,
  ) {}

  async findAll(query): Promise<User[]> {
    const result = await this.userModel.find(query);
    return result;
  }

  async findOne(query): Promise<User | null> {
    try {
      return await this.userModel.findOne(query);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async create(userCreate: UserRegisterDto): Promise<User> {
    try {
      const data = { ...userCreate };
      const user = this.userModel.create(data);
      await this.userModel.save(user);
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
