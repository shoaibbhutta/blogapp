import { Optional } from "sequelize";
export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  date_of_birth: Date;
  email: string;
  profileImageUrl?: string;
  password: string;
  bio: string;
  RoleId?: number;
}

export interface UserCreationAttributes
  extends Optional<UserInterface, "id" | "bio" | "profileImageUrl"> {}
