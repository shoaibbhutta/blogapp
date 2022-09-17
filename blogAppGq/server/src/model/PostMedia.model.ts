import { DataTypes, Model } from "sequelize";
import { ObjectType, Field } from "type-graphql";

import sequelize from "../config/database";
// import Post from "./Post.model";
import {
  postMediaInterface,
  PostMediaCreationAttributes,
} from "../interfaces/postMedia";

@ObjectType()
class PostMedia
  extends Model<postMediaInterface, PostMediaCreationAttributes>
  implements postMediaInterface
{
  @Field()
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  @Field()
  public mediaUrl!: string;
  @Field()
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
// console.log(Post, "<<<<<<<<<POST MEDIA");
// Post.hasMany(PostMedia);
// PostMedia.belongsTo(Post);

export default PostMedia;
