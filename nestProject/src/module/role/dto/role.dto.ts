import { IsString } from 'class-validator';

export interface roleDto {
  name: string;
}

export class createRoleDto {
  @IsString()
  readonly name: string;
}
