import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { User } from '../../model/user.model';
import { RoleService } from '../role/role.service';
import { NodeMailerService } from '../mailer/mailer.service';
@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly userService: UserService,
    public readonly RoleServices: RoleService,
    public readonly NodeMailer: NodeMailerService,
  ) {}

  async login(body: UserLoginDto) {
    try {
      const { email, password } = body;
      if (!email && !password) {
        throw new BadRequestException('Password and Email are Required');
      }
      const user = await this.validateUser(email, password);
      const payload = {
        loggedInUser: user,
      };
      return {
        user,
        token: this.jwtService.sign(payload, {
          secret: process.env.APP_SECRET,
        }),
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async validateUser(email: string, plainPassword: string): Promise<User> {
    try {
      const user = await this.userService.findOne({ email });
      // console.log('im here', user);
      if (!user) throw new BadRequestException('Invalid Password or Email');

      const isPasswordMatching = await bcrypt.compare(
        plainPassword,
        user.password,
      );
      if (!isPasswordMatching)
        throw new BadRequestException('Inavlid Passsword or Email');

      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async register(userRegisterDto: UserRegisterDto) {
    try {
      // logic here
      const user = await this.userService.findOne({
        email: userRegisterDto.email,
      });
      const role = await this.RoleServices.findOne({ name: 'admin' });
      if (user) {
        throw new BadRequestException(
          'User with this Email already registered',
        );
      }
      const createUserDto = {
        ...userRegisterDto,

        password: await bcrypt.hash(userRegisterDto.password, 10),
        Role: role,
      };
      await this.userService.create(createUserDto);
      this.NodeMailer.sendWelcomeEmail({ to: user.email });
      return { message: 'user created successfully' };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
