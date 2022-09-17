import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../../model/user.model';

@ObjectType()
export class UserLoginOutput {
  @Field()
  token: string;
  @Field(() => User)
  user: User;
}

@ObjectType()
export class UserSignupOutput {
  @Field()
  message: string;
}
