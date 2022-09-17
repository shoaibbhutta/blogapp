import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CreateRoleOutput, DeleteRoleOutput } from './dto/output';
import { CreateRoleInputType } from './input/input';

import { GqlAuthGuard } from 'src/core/guards/gql-auth-guard';

import { RoleService } from './role.service';
@Resolver()
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateRoleOutput)
  async createRole(@Args('body') body: CreateRoleInputType) {
    return await this.roleService.createRole(body);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteRoleOutput)
  async deleteRole(@Args('roleId', { type: () => String }) roleId: string) {
    return await this.roleService.deleteRole(roleId);
  }
}
