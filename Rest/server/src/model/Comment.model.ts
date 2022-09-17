import { Association, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User.model";
import Post from "./Post.model";

import {
  commentInterface,
  CommentCreationAttributes,
} from "../interfaces/comment";

class Comment
  extends Model<commentInterface, CommentCreationAttributes>
  implements commentInterface
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public comment!: string;
  rootId!: number;
  PostId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public Comments?: Comment[];
  public static associations: {
    CommentId: Association<Comment, Comment>;
    user: Association<Comment, User>;
    PostId: Association<Comment, Post>;
  };
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "comments",
    sequelize, // passing the `sequelize` instance is required
  }
);
// Comment.isHierarchy();
Comment.hasMany(Comment);
Comment.belongsTo(Comment);
// Comment.isHierarchy();
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
export default Comment;
