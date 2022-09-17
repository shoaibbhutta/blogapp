import { IsString, MinLength } from 'class-validator';
// import { RoleType } from 'src/core/common/constants/role-type';

export class createPostDto {
  @IsString()
  @MinLength(8)
  description!: string;
}
