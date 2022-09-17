import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import { roleInterface, RoleCreationAttributes } from "../interfaces/role";

class Role
  extends Model<roleInterface, RoleCreationAttributes>
  implements roleInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "roles",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Role;


