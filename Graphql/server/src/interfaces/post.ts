import { Optional } from "sequelize";
export interface postInterface {
  id: number;
  description: string;
  UserId?: number;
  // createdAt?: Date;
  // updatedAt?: Date;
  // postmedia?: [];
}

export interface PostCreationAttributes extends Optional<postInterface, "id"> {}
