import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleInputType {
  @Field()
  @IsString()
  readonly name: string;
}
