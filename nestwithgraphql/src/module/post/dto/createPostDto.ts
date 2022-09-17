import { IsString, MinLength } from 'class-validator';
// import { RoleType } from 'src/core/common/constants/role-type';

import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreatePostDto {
  @Field()
  @IsString()
  @MinLength(8)
  description!: string;
}

@InputType()
export class UpdatePostDto {
  @Field()
  @IsString()
  @MinLength(8)
  description!: string;

  @Field()
  @IsString()
  postId!: string;
}
