import { Module } from '@nestjs/common';
import { Role } from '../../model/role.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [],
  providers: [RoleService, RoleResolver],
  exports: [RoleResolver, RoleService],
})
export class RoleModule {}
