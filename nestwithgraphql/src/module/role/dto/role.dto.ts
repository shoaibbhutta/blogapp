import { IsString, IsNotEmpty } from 'class-validator';

export interface roleDto {
  name: string;
}

export class createRoleDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
