import {
  //   isArray,
  IsEmail,
  IsDate,
  //   IsEnum,
  IsNotEmpty,
  IsOptional,
  //   IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
// import { RoleType } from 'src/core/common/constants/role-type';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsOptional()

  //   @IsEnum(RoleType)
  //   role?: string;
  @IsDate()
  dateOfBirth: Date;
}
