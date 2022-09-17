import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { User } from '../../model/user.model';
import { RoleModule } from '../role/role.module';
// import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';
import { NodeMailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    UserModule,
    RoleModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
    NodeMailerModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtStrategy,
    ConfigService,
    LocalStrategy,
  ],
})
export class AuthModule {}
