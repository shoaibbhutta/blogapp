import { User } from '../../../model/user.model';
export interface UserLoginOutput {
  token: string;
  user: User;
}
