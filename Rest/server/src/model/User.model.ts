import { Association, DataTypes, Model } from "sequelize";

import { UserInterface, UserCreationAttributes } from "../interfaces/user";
import Role from "./Role.model";
import sequelize from "../config/database";
// const User: ModelDefined<UserInterface, UserCreationAttributes> =
//   sequelize.define(
//     "User",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
// firstName: {
//   type: DataTypes.STRING,
// },

// lastName: {
//   type: DataTypes.STRING,
// },

// email: {
//   type: DataTypes.STRING,
//   allowNull: false,
//   unique: "email",
// },
// date_of_birth: {
//   type: DataTypes.DATE,
//   allowNull: true,
// },

// bio: {
//   type: DataTypes.STRING,
// },
// profileImageUrl: {
//   type: DataTypes.STRING,
// },

// password: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
//     },
//     {
//       tableName: "users",
//       //sequelize: sequelize, // passing the `sequelize` instance is required
//     }
//   );

// export default User;

class User
  extends Model<UserInterface, UserCreationAttributes>
  implements UserInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public firstName!: string;
  public lastName!: string;

  public email!: string;

  // timestamps!
  date_of_birth!: Date;
  bio!: string;
  profileImageUrl!: string;
  password!: string;
  RoleId!: number;
  public readonly role?: Role;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    RoleId: Association<User, Role>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

// import * as Sequelize from "sequelize";
// import sequelize from "../config/database";

// export interface UserAddModel {
//   email: string;
//   password: string;
// }

// export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
//   id: number;
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface UserViewModel {
//   id: number;
//   email: string;
// }

// export const User = sequelize.define<UserModel, UserAddModel>("users", {
//   // id: {
//   //   type: Sequelize.INTEGER,
//   //   autoIncrement: true,
//   //   primaryKey: true,
//   // },
//   email: Sequelize.STRING,
//   password: Sequelize.STRING,
// });

Role.hasOne(User);
User.belongsTo(Role);

export default User;
