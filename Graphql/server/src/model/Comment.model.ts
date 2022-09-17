import { Association, DataTypes, Model } from "sequelize";
import { ObjectType, Field } from "type-graphql";

import sequelize from "../config/database";
import User from "./User.model";
import Post from "./Post.model";

import {
  commentInterface,
  CommentCreationAttributes,
} from "../interfaces/comment";
@ObjectType()
class Comment
  extends Model<commentInterface, CommentCreationAttributes>
  implements commentInterface
{
  @Field()
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  @Field() public comment!: string;

  @Field() PostId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  @Field((type) => [Comment], { nullable: "itemsAndList" })
  public Comments?: Comment[];
  @Field((type) => User, { nullable: true })
  public User?: User;
  @Field({ nullable: true })
  public CommentId!: number;
  @Field()
  public UserId!: number;
  public static associations: {
    CommentId: Association<Comment, Comment>;
    User: Association<Comment, User>;
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

export default Comment;
