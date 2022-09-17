import "reflect-metadata";
import {
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../../utils/auth";

import Role from "../../model/Role.model";
@ObjectType()
class RoleResponse {
  @Field(() => Role, { nullable: true })
  role?: string;
  @Field(() => String, { nullable: true })
  message?: string;
}

@Resolver()
export class RoleResollver {
  @Mutation(() => RoleResponse)
  @UseMiddleware(isAuth)
  async createRole(@Arg("name") name: string) {
    try {
      let role: Role | null = await Role.findOne({
        where: {
          name: name.toLowerCase(),
        },
      });
      if (!role) {
        role = new Role({
          name: name.toLowerCase(),
        });
        await role.save();
      }
      return role;
    } catch (e) {
      return { message: "something went wrong in postAddRole" };
      console.trace(e);
    }
  }

  @Mutation(() => RoleResponse)
  @UseMiddleware(isAuth)
  async deleteRole(@Arg("id") id: number) {
    try {
      let role: Role | null = await Role.findOne({
        where: {
          id,
        },
      });
      if (!role) {
        return { message: "the role with this id was not found" };
      }
      await Role.destroy({
        where: {
          id,
        },
      });
      return { message: "user deleted successfully" };
    } catch (e) {
      return { message: "something went wrong in postAddRole" };
      console.trace(e);
    }
  }
}
