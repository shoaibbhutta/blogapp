import { Optional } from "sequelize";
export interface roleInterface {
  id: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<roleInterface, "id"> {}
