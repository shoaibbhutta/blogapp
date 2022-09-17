import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { User } from '../../model/user.model';
@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly userService: UserService,
  ) {}

  async login(body: UserLoginDto) {
    const { email, password } = body;

    const user = await this.validateUser(email, password);
    const payload = {
      userId: user.id,
    };
    return {
      user,
      token: this.jwtService.sign(payload, { secret: process.env.APP_SECRET }),
    };
  }

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.userService.findOne({ email });
    // console.log('im here', user);
    if (!user) throw new BadRequestException('Inavlid Passsword or Email');

    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      user.password,
    );
    if (!isPasswordMatching)
      throw new BadRequestException('Inavlid Passsword or Email');

    return user;
  }
  async register(userRegisterDto: UserRegisterDto) {
    // logic here
    const user = await this.userService.findOne({
      email: userRegisterDto.email,
    });
    if (user) {
      throw new BadRequestException('User with this Email already registered');
    }
    const createUserDto = {
      ...userRegisterDto,

      password: await bcrypt.hash(userRegisterDto.password, 10),
      roleId: 3,
    };
    await this.userService.create(createUserDto);

    return 'user created successfully';
  }
}
