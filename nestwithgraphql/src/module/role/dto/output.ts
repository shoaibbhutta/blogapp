import { Role } from '../../../model/role.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateRoleOutput {
  @Field(() => Role)
  role: Role;
}

@ObjectType()
export class DeleteRoleOutput {
  @Field()
  message: string;
}
