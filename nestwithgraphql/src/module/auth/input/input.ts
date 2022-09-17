import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInputType {
  @Field()
  @IsEmail()
  readonly email: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

@InputType()
export class SignupInputType {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @Field()
  @IsNotEmpty()
  @IsDate()
  readonly dateOfBirth: Date;
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}
