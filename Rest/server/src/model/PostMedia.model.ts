import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Post from "./Post.model";
import {
  postMediaInterface,
  PostMediaCreationAttributes,
} from "../interfaces/postMedia";

class PostMedia
  extends Model<postMediaInterface, PostMediaCreationAttributes>
  implements postMediaInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public mediaUrl!: string;
  PostId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostMedia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    mediaUrl: {
      type: DataTypes.STRING(1000),
    },
  },
  {
    tableName: "postMedia",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default PostMedia;

Post.hasMany(PostMedia);
PostMedia.belongsTo(Post);
